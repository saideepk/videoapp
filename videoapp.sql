-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2018 at 10:06 PM
-- Server version: 5.5.39
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `videoapp`
--

--
-- Dumping data for table `adminlogin`
--

INSERT INTO `adminlogin` (`admin_id`, `name`, `email_id`, `password`) VALUES
(1, 'saideep kankarla', 'skankarla@gmail.com', '123456');

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `status`) VALUES
(1, 'Arts', 'Arts videos comes here', 'Active'),
(2, 'Education', 'Education videos comes here', 'Active'),
(3, 'Entertainment', 'Entertainment videos comes here', 'Active'),
(4, 'Science', 'Science videos comes here', 'Active'),
(5, 'Technology', 'Technology videos comes here', 'Active');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `phone`, `email_id`, `password`, `status`) VALUES
(1, 'saideep', 1234567890, 'skankarla@gmail.com', '123456', 'Active');

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`video_id`, `user_id`, `category_id`, `video_name`, `video_description`, `video_thumbnail`, `video_duration`, `video_upload_path`, `video_uploadedon`, `video_views`, `isPublic`, `status`) VALUES
(1, 1, 2, 'My video 1', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia', 'videoThumb-1540758789186.png', '', 'videoFile-1540758789194.mp4', '2018-10-29 02:03:09', 2, 'true', 'Active');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
