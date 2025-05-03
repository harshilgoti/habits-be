"use client";

import { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TaskTracker() {
  // State for completed tasks
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // State for current date and view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    // Previous month days to fill the first row
    const prevMonthDays = [];
    if (firstDayOfMonth > 0) {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        prevMonthDays.push({
          date: new Date(prevMonthYear, prevMonth, day),
          isCurrentMonth: false,
          isToday: false,
        });
      }
    }

    // Current month days
    const currentMonthDays = [];
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      currentMonthDays.push({
        date,
        isCurrentMonth: true,
        isToday:
          today.getDate() === day &&
          today.getMonth() === currentMonth &&
          today.getFullYear() === currentYear,
      });
    }

    // Next month days to fill the last row
    const nextMonthDays = [];
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const nextDaysNeeded = 42 - totalDays; // 6 rows of 7 days

    if (nextDaysNeeded > 0) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

      for (let day = 1; day <= nextDaysNeeded; day++) {
        const date = new Date(nextMonthYear, nextMonth, day);
        nextMonthDays.push({
          date,
          isCurrentMonth: false,
          isToday: false,
        });
      }
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Toggle task completion
  const toggleTask = (dateString: string) => {
    if (completedTasks.includes(dateString)) {
      setCompletedTasks(completedTasks.filter((d) => d !== dateString));
    } else {
      setCompletedTasks([...completedTasks, dateString]);
    }
  };

  // Navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Format date to string for tracking completed tasks
  const formatDateString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Day names for header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Month names for header
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize with some sample completed tasks
  useEffect(() => {
    const today = new Date();
    const sampleCompletedDates = [];

    // Add 5 random days in current month as completed
    for (let i = 0; i < 5; i++) {
      const randomDay =
        Math.floor(Math.random() * getDaysInMonth(currentYear, currentMonth)) +
        1;
      const date = new Date(currentYear, currentMonth, randomDay);
      sampleCompletedDates.push(formatDateString(date));
    }

    setCompletedTasks(sampleCompletedDates);
  }, []);

  const calendarDays = generateCalendarDays();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h1 className="text-2xl font-bold mb-6">Task Completion Tracker</h1>

      <div className="w-full max-w-3xl border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Calendar Header */}
        <div className="bg-white p-4 flex items-center justify-between border-b">
          <button
            onClick={goToPrevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h2 className="text-lg font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 bg-gray-50">
          {dayNames.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {calendarDays.map((day, index) => {
            const dateString = formatDateString(day.date);
            const isCompleted = completedTasks.includes(dateString);

            return (
              <div
                key={index}
                className={cn(
                  "relative bg-white flex flex-col items-center justify-center p-2 min-h-[80px] cursor-pointer transition-colors",
                  !day.isCurrentMonth && "bg-gray-50 text-gray-400",
                  day.isToday && "ring-2 ring-inset ring-blue-500",
                  !day.isCurrentMonth && "hover:bg-gray-100",
                  day.isCurrentMonth && "hover:bg-gray-50"
                )}
                onClick={() => day.isCurrentMonth && toggleTask(dateString)}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full",
                    day.isToday ? "bg-blue-500 text-white" : "text-gray-700"
                  )}
                >
                  {day.date.getDate()}
                </span>

                {isCompleted && day.isCurrentMonth && (
                  <div className="flex items-center justify-center w-10 h-10 mt-1 bg-green-500 rounded-full">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Click on a day to mark a task as completed</p>
      </div>
    </div>
  );
}
