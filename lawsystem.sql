-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2019 at 10:49 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lawsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `addcase`
--

CREATE TABLE `addcase` (
  `id` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `title` varchar(200) NOT NULL,
  `victimName` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `casepdf` varchar(200) NOT NULL,
  `file` varchar(200) NOT NULL,
  `lawyerId` int(100) NOT NULL,
  `isRejected` int(10) NOT NULL,
  `isApproved` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `addcase`
--

INSERT INTO `addcase` (`id`, `email`, `title`, `victimName`, `description`, `casepdf`, `file`, `lawyerId`, `isRejected`, `isApproved`) VALUES
(2, 'surajmishra1612@gmail.com', 'murder', 'suraj mishra', 'murder and robbery case', '/uploads/user/surajmishra1612@gmail.com/19441110002613.pdf', '19441110002613.pdf', 2, 0, 1),
(3, 'anujd900@gmail.com', 'murder', 'anuj', 'murder and rape', '/uploads/user/anujd900@gmail.com/1547874472781_chatbot-desc.docx', '1547874472781_chatbot-desc.docx', 1, 0, 1),
(4, 'satendrachauhan766523@gmail.com', 'murder', 'Satendra chauhan', 'murder and robbery', '/uploads/user/satendrachauhan766523@gmail.com/19441110002613.pdf', '19441110002613.pdf', 2, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lawyerprofile`
--

CREATE TABLE `lawyerprofile` (
  `id` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(100) NOT NULL,
  `education` varchar(100) NOT NULL,
  `speciality` varchar(100) NOT NULL,
  `experience` varchar(100) NOT NULL,
  `fees` varchar(200) NOT NULL,
  `caseFought` varchar(1000) NOT NULL,
  `caseWin` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `profilePic` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lawyerprofile`
--

INSERT INTO `lawyerprofile` (`id`, `email`, `name`, `address`, `education`, `speciality`, `experience`, `fees`, `caseFought`, `caseWin`, `description`, `profilePic`) VALUES
(2, 'palsandeep185@gmail.com', 'sandeep', 'pal', 'MBBS LLB', 'Murder robbery', '12', '8000', '12', '7', 'Professional', '/uploads/lawyer/palsandeep185@gmail.com/boeing_c_17_globemaster_iii_military_transport_aircraft_4k.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `lawyerreg`
--

CREATE TABLE `lawyerreg` (
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `contactNo` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lawyerreg`
--

INSERT INTO `lawyerreg` (`fname`, `lname`, `contactNo`, `email`, `password`) VALUES
('anil', 'chauhan', '1234567890', 'anilchhn19@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
('sandeep', 'pal', '1234567890', 'palsandeep185@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
('vikas ', 'pandey', '1234567890', 'vpan720@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055');

-- --------------------------------------------------------

--
-- Table structure for table `userreg`
--

CREATE TABLE `userreg` (
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `contactNo` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userreg`
--

INSERT INTO `userreg` (`fname`, `lname`, `contactNo`, `email`, `password`) VALUES
('anuj', 'dubey', '1234567890', 'anujd900@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
('Satendra', 'Chauhan', '1234567890', 'satendrachauhan766523@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
('suraj', 'mishra', '1234567890', 'surajmishra1612@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addcase`
--
ALTER TABLE `addcase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lawyerprofile`
--
ALTER TABLE `lawyerprofile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lawyerreg`
--
ALTER TABLE `lawyerreg`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `userreg`
--
ALTER TABLE `userreg`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addcase`
--
ALTER TABLE `addcase`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lawyerprofile`
--
ALTER TABLE `lawyerprofile`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
