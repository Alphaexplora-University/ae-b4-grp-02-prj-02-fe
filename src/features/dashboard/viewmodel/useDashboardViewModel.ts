// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Booking,
  Vendor,
  NotificationItem,
  DashboardMetrics,
} from "../model/dashboard.model";

export function useDashboardViewModel() {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notificationItems, setNotificationItems] = useState<
    NotificationItem[]
  >([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "Pending" | "Accepted" | "Rejected"
  >("Pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    todayVolume: 0,
    weeklyVelocity: 0,
    activeBacklog: 0,
  });

  // Load vendor session and bookings from localStorage
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      navigate("/login");
      return;
    }

    const parsedVendor: Vendor = JSON.parse(session);
    setVendor(parsedVendor);

    ///uu========================
    const allBookings: Booking[] = JSON.parse(
      localStorage.getItem("bookings") ?? "[]",
    );

    // HARDCODED SEED — for checking wkwkwkkwkw


    const vendorBookings = allBookings.filter(
      (b) => b.vendor_id === parsedVendor.id,
    );

    setBookings(vendorBookings);
    computeMetrics(vendorBookings);
    buildNotifications(vendorBookings);
  }, []);

  const computeMetrics = (data: Booking[]) => {
    const today = new Date().toDateString();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    setMetrics({
      todayVolume: data.filter(
        (b) => new Date(b.created_at).toDateString() === today,
      ).length,
      weeklyVelocity: data.filter((b) => new Date(b.created_at) >= weekAgo)
        .length,
      activeBacklog: data.filter((b) => b.status === "Pending").length,
    });
  };

  const buildNotifications = (data: Booking[]) => {
    const activity: NotificationItem[] = data
      .filter((b) => b.status === "Pending")
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
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

  // Derived state — filtered bookings
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
    // Mark as read
    setNotificationItems((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)),
    );
    setNotificationOpen(false);

    // Open modal for selected booking
    const booking = bookings.find((b) => b.id === item.booking_id);
    if (booking) onOpenModal(booking);
  };

  const onSaveStatus = () => {
    if (!selectedBooking) return;

    const confirmed = window.confirm(
      `Update booking status to "${selectedStatus}"? The customer will be notified on their dashboard.`,
    );
    if (!confirmed) return;

    // Update in localStorage
    const allBookings: Booking[] = JSON.parse(
      localStorage.getItem("bookings") ?? "[]",
    );
    const updated = allBookings.map((b) =>
      b.id === selectedBooking.id
        ? { ...b, status: selectedStatus, updated_at: new Date().toISOString() }
        : b,
    );
    localStorage.setItem("bookings", JSON.stringify(updated));

    // Refresh state
    const session = localStorage.getItem("session");
    if (!session) return;
    const parsedVendor: Vendor = JSON.parse(session);
    const vendorBookings = updated.filter(
      (b) => b.vendor_id === parsedVendor.id,
    );
    setBookings(vendorBookings);
    computeMetrics(vendorBookings);
    buildNotifications(vendorBookings);
    onCloseModal();
  };

  const onLogout = () => {
    localStorage.removeItem("session");
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
