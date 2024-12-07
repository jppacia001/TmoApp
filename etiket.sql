-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 12:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `etiket`
--

-- --------------------------------------------------------

--
-- Table structure for table `accident_reports`
--

CREATE TABLE `accident_reports` (
  `id` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `description` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accident_reports`
--

INSERT INTO `accident_reports` (`id`, `location`, `address`, `description`, `timestamp`) VALUES
(1, '13.8873281, 120.647693', 'Margarita St. Brgy. 7 Nasugbu, Batangas', 'Car', '2024-11-21 13:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `traffic_records`
--

CREATE TABLE `traffic_records` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `license_no` varchar(20) NOT NULL,
  `license_expiry_date` date DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `violation_type` varchar(50) NOT NULL,
  `violation_date` date DEFAULT NULL,
  `violation_place` text NOT NULL,
  `violation_latitude` double DEFAULT NULL,
  `violation_longitude` double DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `time_of_submission` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `traffic_records`
--

INSERT INTO `traffic_records` (`id`, `user_id`, `driver_name`, `address`, `license_no`, `license_expiry_date`, `date_of_birth`, `remarks`, `violation_type`, `violation_date`, `violation_place`, `violation_latitude`, `violation_longitude`, `phone_number`, `email`, `time_of_submission`) VALUES
(1, 9, 'Aaron Josh Kao', 'Luntal,Tuy', 'D77-27-837773', '2024-12-05', '2024-12-05', 'Nyah', 'speeding', '2024-12-05', 'Lat: 14.627367835280351, Lon: 120.99404498934746', 14.62736783528, 120.99404498935, '+639555223383', 'kao.aaronjosh08@gmail.com', '2024-12-05 08:15:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `tmoId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `gender` enum('male','female') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `tmoId`, `name`, `birthday`, `gender`, `address`, `email`, `password`) VALUES
(9, '24-110001', 'John Person Pacia', '2000-07-14', 'male', 'Nasugbu, Batangas', 'admin', '$2y$10$rSTIupUokSnjPqJ0mEhHF.Ay.kiKWGYuUqkC4FC.WkXbaGGfyT5Be');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accident_reports`
--
ALTER TABLE `accident_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `traffic_records`
--
ALTER TABLE `traffic_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `tmoId` (`tmoId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accident_reports`
--
ALTER TABLE `accident_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `traffic_records`
--
ALTER TABLE `traffic_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
