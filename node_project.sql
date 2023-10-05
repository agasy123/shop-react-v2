-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 01, 2023 at 07:07 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(20) NOT NULL,
  `description` varchar(300) NOT NULL,
  `image` varchar(30) NOT NULL,
  `chipset` varchar(30) NOT NULL,
  `display_size` double NOT NULL,
  `camera` double NOT NULL,
  `storage` int(11) NOT NULL,
  `memory` int(11) NOT NULL,
  `price` double NOT NULL,
  `sale_price` double DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `category` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `chipset`, `display_size`, `camera`, `storage`, `memory`, `price`, `sale_price`, `quantity`, `category`, `type`) VALUES
(1, 'Samsung S10', 'Some desc', 'samsungS10.jpg', 'Exynos esim inch', 6.5, 32, 128, 8, 499, NULL, 11, 'electronics', 'smartphone'),
(2, 'Iphone 12', 'Some desc', 'iphone3.jpg', 'A12', 6.4, 20, 256, 6, 599.99, 499.99, 21, 'electronics', 'smartphone'),
(3, 'Xiaomi 13', 'Some text', 'xiaomi13.jpg', 'Snapdragon 8 gen 2', 6.8, 120, 128, 12, 699.99, 0, 30, 'electronics', 'smartphone'),
(4, 'Samsung Z Flip 5', 'some lorem ipsuwum', 'samsungZflip4.jpg', 'Snapdragon 8+ Gen 1', 6.7, 12, 256, 8, 899.99, 799.99, 15, 'electronics', 'smartphone');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
