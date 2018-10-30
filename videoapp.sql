-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2018 at 09:12 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `adminlogin`
--

CREATE TABLE IF NOT EXISTS `adminlogin` (
`admin_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email_id` varchar(200) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `adminlogin`
--

INSERT INTO `adminlogin` (`admin_id`, `name`, `email_id`, `password`) VALUES
(1, 'saideep kankarla', 'skankarla@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
`category_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(7) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `status`) VALUES
(1, 'Arts', 'Arts videos comes here', 'Active'),
(2, 'Education', 'Education videos comes here', 'Active'),
(3, 'Entertainment', 'Entertainment videos comes here', 'Active'),
(4, 'Science', 'Science videos comes here', 'Active'),
(5, 'Technology', 'Technology videos comes here', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
`comment_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(10) NOT NULL,
  `comments` text NOT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `video_id`, `name`, `email`, `phone`, `comments`, `status`) VALUES
(1, 1, 'Saideep', 'saideep.kankarla@gmail.com', 2147483647, 'Adding my 1st comment', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`user_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` int(10) NOT NULL,
  `email_id` varchar(200) NOT NULL,
  `password` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `phone`, `email_id`, `password`, `status`) VALUES
(1, 'saideep', 1234567890, 'skankarla@gmail.com', '12345678', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
`video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `video_name` varchar(255) NOT NULL,
  `video_description` text NOT NULL,
  `video_thumbnail` varchar(255) NOT NULL DEFAULT 'nothumb.png',
  `video_duration` varchar(10) NOT NULL,
  `video_upload_path` varchar(255) NOT NULL,
  `video_uploadedon` varchar(30) NOT NULL,
  `video_views` int(10) NOT NULL DEFAULT '0',
  `isPublic` varchar(5) NOT NULL DEFAULT 'true',
  `status` varchar(10) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`video_id`, `user_id`, `category_id`, `video_name`, `video_description`, `video_thumbnail`, `video_duration`, `video_upload_path`, `video_uploadedon`, `video_views`, `isPublic`, `status`) VALUES
(1, 1, 2, 'My video 1', 'Some desc comes here', 'videoThumb-1540908579790.jpg', '', 'videoFile-1540908579791.mp4', '10/30/2018, 7:39:39 PM', 2, 'true', 'Active'),
(2, 1, 2, 'Cloud functions', 'My video 2', 'videoThumb-1540908704081.jpg', '', 'videoFile-1540908704086.mp4', '10/30/2018, 7:41:44 PM', 0, 'true', 'Active'),
(3, 1, 3, 'React basics', 'React basics desc', 'videoThumb-1540908733114.jpg', '', 'videoFile-1540908733116.mp4', '10/30/2018, 7:42:13 PM', 0, 'true', 'Active'),
(4, 1, 5, 'New AWS Series', 'New AWS Series desc comes here', 'videoThumb-1540908770944.jpg', '', 'videoFile-1540908770944.mp4', '10/30/2018, 7:42:50 PM', 0, 'true', 'Active'),
(5, 1, 2, 'Node js basics', 'Node js basics desc comes here', 'videoThumb-1540908869201.jpg', '', 'videoFile-1540908869203.mp4', '10/30/2018, 7:44:29 PM', 0, 'true', 'Active'),
(6, 1, 4, 'PHP Storm', 'PHP Storm desc comes here', 'videoThumb-1540908904639.jpg', '', 'videoFile-1540908904640.mp4', '10/30/2018, 7:45:04 PM', 0, 'true', 'Active'),
(7, 1, 1, 'CSS 3 Tutorials', 'CSS 3 Tutorials explained', 'videoThumb-1540908979143.jpg', '', 'videoFile-1540908979146.mp4', '10/30/2018, 7:46:19 PM', 0, 'true', 'Active'),
(8, 1, 5, 'Git Basics', 'Git Basics come shere', 'videoThumb-1540909014237.jpg', '', 'videoFile-1540909014239.mp4', '10/30/2018, 7:46:54 PM', 0, 'true', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `videos_history`
--

CREATE TABLE IF NOT EXISTS `videos_history` (
`history_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `viewedOn` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminlogin`
--
ALTER TABLE `adminlogin`
 ADD PRIMARY KEY (`admin_id`), ADD UNIQUE KEY `email_id` (`email_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
 ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
 ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
 ADD PRIMARY KEY (`video_id`);

--
-- Indexes for table `videos_history`
--
ALTER TABLE `videos_history`
 ADD PRIMARY KEY (`history_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminlogin`
--
ALTER TABLE `adminlogin`
MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `videos_history`
--
ALTER TABLE `videos_history`
MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
