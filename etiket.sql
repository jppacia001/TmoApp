-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 04:27 AM
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
(1, '123', 'John Person Pacia', '0000-00-00', 'male', 'Nasugbu, Batangas', 'user', '$2y$10$9yiX5KlsTn4zV803Ub9jmec7Ly9IHSFfL1ClyDcaLw9r1XEAa1xIe'),
(3, '124', 'Aaron Josh Kao', '0000-00-00', 'male', 'Tuy, Batangas', 'aaronjosh12@gmail.com', '$2y$10$xyRf5GrU.0OGV0vpQZCNouZAqSxj34tm4/5FDSiifYxng2cG8ihKm'),
(4, '125', 'Ron Leo Salazar', '0000-00-00', 'male', 'Calatagan, Batangas', 'ronleo11@gmail.com', '$2y$10$BoxVxHCMacHwYZnlqTAsaOER6OBL0MPLJRJOCZARr8CfksY/ltOXi'),
(5, '1323123', 'Daddy Renzo', '0000-00-00', 'male', 'Nasugbu, Batangas', 'user1', '$2y$10$YeuHh3RIisJ7dcBh72SPOeUVRG0RTnGoNS4FN8Z.RslflYvkubfUC'),
(6, '123', 'Ron Salazar', '0000-00-00', 'male', 'Nasugbu, Batangas', 'test', '$2y$10$t6vsZCHg5os9kuDEtzDaA.7ApnJ8.XrxcxcFtZSQK1X7omNJyRj9i'),
(7, '1212351', 'OLI HERNANDEZ', '0000-00-00', 'male', 'Tttt', '@ganam.com', '$2y$10$mF5qt2e3ftNjO2EuwyfcW.jNtWYOHxjPR0dHb2/xVB5YQrTyNZxfG');

-- --------------------------------------------------------

--
-- Table structure for table `violations`
--

CREATE TABLE `violations` (
  `id` int(11) NOT NULL,
  `driverName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `licenseNo` varchar(50) NOT NULL,
  `licenseExpiryDate` date NOT NULL,
  `dateOfBirth` date NOT NULL,
  `remarks` text DEFAULT NULL,
  `violationType` varchar(255) NOT NULL,
  `violationDate` date NOT NULL,
  `violationTime` time NOT NULL,
  `violationPlace` varchar(255) NOT NULL,
  `ownerOfVehicle` varchar(255) NOT NULL,
  `plateNumber` varchar(50) NOT NULL,
  `vehicleRegistrationNumber` varchar(50) NOT NULL,
  `colorOfVehicle` varchar(50) NOT NULL,
  `typeOfVehicle` varchar(50) NOT NULL,
  `codingStickerNo` varchar(50) NOT NULL,
  `insurancePolicyNumber` varchar(50) NOT NULL,
  `toda` varchar(50) NOT NULL,
  `violationCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `violations`
--

INSERT INTO `violations` (`id`, `driverName`, `address`, `licenseNo`, `licenseExpiryDate`, `dateOfBirth`, `remarks`, `violationType`, `violationDate`, `violationTime`, `violationPlace`, `ownerOfVehicle`, `plateNumber`, `vehicleRegistrationNumber`, `colorOfVehicle`, `typeOfVehicle`, `codingStickerNo`, `insurancePolicyNumber`, `toda`, `violationCount`) VALUES
(1, '', '', '', '2024-07-30', '2024-07-30', '', '', '2024-07-30', '15:20:33', '', '', '', '', '', '', '', '', '', 0),
(2, 'April', 'TUY', 'D123', '2024-07-30', '2024-07-30', 'Mayabang', 'No driver\'s License', '2024-07-30', '15:22:50', 'Nasugbu', 'April', 'D123', '123', 'Black', 'Motorcycle', '0124', '', '', 2),
(3, '', '', '', '2024-07-30', '2024-07-30', '', '', '2024-07-30', '15:52:28', '', '', '', '', '', '', '', '', '', 0),
(4, 'Renzo', 'Nasugbu', '1234', '2024-07-30', '2024-07-30', '', '', '2024-07-30', '15:52:31', 'Nasugbu', 'Renzo', 'D1234', '362883', 'Violet', 'Motorcycle', '', '', '', 1),
(5, '', '', '', '2024-07-30', '2024-07-30', '', 'null', '2024-07-30', '16:04:54', '', '', '', '', '', '', '', '', '', 0),
(6, 'Aldrin', 'Nasugbu, Batangas', 'D1027472', '2024-07-30', '2024-07-30', 'Impound', 'Arrogant', '2024-07-30', '19:21:35', 'Brgy. 5', 'Aldrin', '123455', '12345y', 'White', 'Motorcycle', '', '', '', 3),
(7, 'April Mendoza', 'Tuy, Batangas', '12345', '2024-07-31', '2024-07-31', '', 'No driver\'s License', '2024-07-31', '15:05:45', 'Nasugbu, Batangas', 'April ', '12345', '12344', 'Black', 'Motorcycle', '0011', '12345', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `violations`
--
ALTER TABLE `violations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `violations`
--
ALTER TABLE `violations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
