import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bookingsApi } from "../../../api/bookingsApi";
import { vendorSession } from "../../../api/session";
import type { Booking, Vendor, NotificationItem, DashboardMetrics } from "../model/dashboard.model";

export function useDashboardViewModel() {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notificationItems, setNotificationItems] = useState<NotificationItem[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "accepted" | "rejected">("pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    todayVolume: 0,
    weeklyVelocity: 0,
    activeBacklog: 0,
  });

  useEffect(() => {
    setVendor(vendorSession);

    // API call 
    bookingsApi.getMyBookings()
      .then((res) => {
        const vendorBookings: Booking[] = res.data.data  // note: { success, data: [...] }
        setBookings(vendorBookings)
        computeMetrics(vendorBookings)
        buildNotifications(vendorBookings)
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  const computeMetrics = (data: Booking[]) => {
    const today = new Date().toDateString();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    setMetrics({
      todayVolume: data.filter((b) => new Date(b.created_at).toDateString() === today).length,
      weeklyVelocity: data.filter((b) => new Date(b.created_at) >= weekAgo).length,
      activeBacklog: data.filter((b) => b.status === "pending").length,
    });
  };

  const buildNotifications = (data: Booking[]) => {
    const activity: NotificationItem[] = data
      .filter((b) => b.status === "pending")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map((b) => ({
        id: `activity-${b.id}`,
        type: "activity" as const,
        customer_name: b.customer_name,
        service_requested: b.service_requested,
        booking_id: b.id,
        read: false,
        created_at: b.created_at,
      }));

    setNotificationItems(activity);
  };

  const filteredBookings = bookings
    .filter((b) => {
      const matchesSearch =
        b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        b.service_requested.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .slice(0, 10);

  const unreadCount = notificationItems.filter((n) => !n.read).length;

  const onOpenModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setSelectedStatus(booking.status);
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  const onSelectNotification = (item: NotificationItem) => {
    setNotificationItems((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setNotificationOpen(false);
    const booking = bookings.find((b) => b.id === item.booking_id);
    if (booking) onOpenModal(booking);
  };

  const onSaveStatus = async () => {
    if (!selectedBooking) return;

    const confirmed = window.confirm(
      `Update booking status to "${selectedStatus}"? The customer will be notified.`
    );
    if (!confirmed) return;

    try {
      await bookingsApi.updateBookingStatus(selectedBooking.id, selectedStatus)

      // update local state — no need to re-fetch
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? { ...b, status: selectedStatus, updated_at: new Date().toISOString() }
          : b
      );
      setBookings(updatedBookings);
      computeMetrics(updatedBookings);
      buildNotifications(updatedBookings);
      onCloseModal();
    } catch {
      alert("Failed to update status. Please try again.");
    }
  };

  const onLogout = () => {
    navigate("/login");
  };

  return {
    vendor,
    metrics,
    search,
    statusFilter,
    bookings: filteredBookings,
    notificationItems,
    notificationOpen,
    unreadCount,
    selectedBooking,
    selectedStatus,
    modalOpen,
    onSearchChange: setSearch,
    onStatusChange: setStatusFilter,
    onToggleNotifications: () => setNotificationOpen((prev) => !prev),
    onOpenModal,
    onCloseModal,
    onSelectNotification,
    onStatusSelect: setSelectedStatus,
    onSaveStatus,
    onLogout,
  };
}
