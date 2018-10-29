-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2018 at 01:25 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`video_id`, `user_id`, `category_id`, `video_name`, `video_description`, `video_thumbnail`, `video_duration`, `video_upload_path`, `video_uploadedon`, `video_views`, `isPublic`, `status`) VALUES
(1, 1, 2, 'My video 1', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia', 'videoThumb-1540758789186.png', '', 'videoFile-1540758789194.mp4', '2018-10-29 02:03:09', 43, 'true', 'Active'),
(2, 2, 4, 'Lion video', 'Lions have strong, compact bodies and powerful forelegs, teeth and jaws for pulling down and killing prey. Their coats are yellow-gold, and adult males have shaggy manes that range in color from blond to reddish-brown to black.\r\n\r\nThe darker and thicker the mane, the healthier the lion. It allows the lions to appear stronger and frightening to warn off enemies, particularly humans, and appeals to lionesses that are scientifically proven to mate more with lions with thick and dark manes.', 'videoThumb-1540814839747.png', '', 'videoFile-1540814839783.mp4', '2018-10-29 17:37:20', 5, 'true', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
 ADD PRIMARY KEY (`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
