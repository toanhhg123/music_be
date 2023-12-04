-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 04, 2023 lúc 10:47 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `MUSIC_DB`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Albums`
--

CREATE TABLE `Albums` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `desc` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `Albums`
--

INSERT INTO `Albums` (`id`, `name`, `authorId`, `desc`, `image`, `createdAt`, `updatedAt`) VALUES
('536f0b68-8f67-48fe-99a5-ec5c01c7e525', 'Hot Music In Month 12', '157337df-b42d-4986-8071-f1ad27f30219', 'hot fix', '', '2023-12-04 04:17:46', '2023-12-04 04:31:07'),
('824eb10b-1689-4159-a925-0d23246cedbd', 'Hot Music In Month 12', '4231fc24-1d4a-428e-9b09-cfcadc6341f7', '', '', '2023-12-04 17:44:25', '2023-12-04 21:24:45'),
('a6621031-0554-4dff-99f4-2abe6103a0e2', 'Giọng Hát Việt mua 05', '4231fc24-1d4a-428e-9b09-cfcadc6341f7', '', '', '2023-12-04 20:23:17', '2023-12-04 21:00:16'),
('efed53c0-7333-4c2b-a7e2-5d69e54f47f7', 'Rap Việt mùa 6', '4231fc24-1d4a-428e-9b09-cfcadc6341f7', '', 'Rap Việt mùa 6', '2023-12-04 20:19:02', '2023-12-04 21:01:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Comments`
--

CREATE TABLE `Comments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `mediaId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Favorites`
--

CREATE TABLE `Favorites` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `mediaId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Histories`
--

CREATE TABLE `Histories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `mediaId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Medias`
--

CREATE TABLE `Medias` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `albumId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `isPremium` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `Medias`
--

INSERT INTO `Medias` (`id`, `authorId`, `albumId`, `name`, `image`, `src`, `desc`, `isPremium`, `createdAt`, `updatedAt`) VALUES
('3c4ddf0f-5783-489a-ad09-6353ede9a197', '4231fc24-1d4a-428e-9b09-cfcadc6341f7', '824eb10b-1689-4159-a925-0d23246cedbd', 'không thể say', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJi5dRKhcRHQ1EB6zDhoYB9F2q1Sq83C19w&usqp=CAU', 'https://a128-zmp3.zmdcdn.me/566a89dc39c4039fc1828064c3dbdbc1?authen=exp=1701885712~acl=/566a89dc39c4039fc1828064c3dbdbc1/*~hmac=c1f23d24093a63580d378fb7bea24a8e', '123454', 1, '2023-12-04 16:41:37', '2023-12-04 18:48:08'),
('47c204ee-fdaa-4b23-b09d-7ae909622e26', '4231fc24-1d4a-428e-9b09-cfcadc6341f7', '824eb10b-1689-4159-a925-0d23246cedbd', 'bigcity boy', 'https://mcdn.coolmate.me/image/May2022/rapper-binz-la-ai-tieu-su-chang-big-city-boy_700.jpg', '', '', 1, '2023-12-04 18:54:20', '2023-12-04 18:56:21'),
('b22f9fac-caf8-43dd-8ca6-187b205fab3e', '157337df-b42d-4986-8071-f1ad27f30219', '824eb10b-1689-4159-a925-0d23246cedbd', 'Ai cũng phải bắt đầu từ đâu đó', 'https://luxuo.vn/wp-content/uploads/2023/11/HTHLOGO5-scaled-1.jpg', 'https://vnso-pt-15-tf-a128-zmp3.zmdcdn.me/b8f1159c7b42c78c65f3fb420d4f3f93?authen=exp=1701800892~acl=/b8f1159c7b42c78c65f3fb420d4f3f93/*~hmac=fc51ef3a9c3dd821396ae13d3bcc7b0a', '', 0, '2023-12-04 04:20:36', '2023-12-04 18:52:35'),
('b6be1601-7b69-48fa-8e74-e8a845f25538', '4231fc24-1d4a-428e-9b09-cfcadc6341f7', 'a6621031-0554-4dff-99f4-2abe6103a0e2', 'Cua', '', '', '', 0, '2023-12-04 18:53:17', '2023-12-04 20:23:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `PlayListAndMusics`
--

CREATE TABLE `PlayListAndMusics` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `playListId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `mediaId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Playlists`
--

CREATE TABLE `Playlists` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Roles`
--

CREATE TABLE `Roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `Roles`
--

INSERT INTO `Roles` (`id`, `code`, `createdAt`, `updatedAt`) VALUES
('342ee940-b3d3-4d06-9f3d-ba77eb96cb79', '000', '2023-12-04 04:06:20', '2023-12-04 04:06:20'),
('4bbd2001-605c-4df6-922c-9ef8e7568aab', '002', '2023-12-04 04:06:20', '2023-12-04 04:06:20'),
('b8d0fb71-f94e-4394-93e4-aadf576a5917', '001', '2023-12-04 04:06:20', '2023-12-04 04:06:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Users`
--

CREATE TABLE `Users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `isPremium` tinyint(1) DEFAULT 0,
  `roleCode` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `Users`
--

INSERT INTO `Users` (`id`, `firstName`, `lastName`, `email`, `phone`, `password`, `isPremium`, `roleCode`, `createdAt`, `updatedAt`) VALUES
('0e30e1ee-1145-43a9-8439-d41c6d1a7cc4', NULL, NULL, 'user@gmail.com', NULL, '$2b$10$zM5wSOE7RZzH9UDzGiK3reDCqh2/suR6WG3MDqpimlq/ZGMhBZtbW', 0, '002', '2023-12-04 04:06:20', '2023-12-04 04:06:20'),
('157337df-b42d-4986-8071-f1ad27f30219', NULL, NULL, 'singer@gmail.com', NULL, '$2b$10$KA1U13nAEsNvtBwtuIajhOdpPFJUgnsg6BPnARl6RGB9qW6i8oiHe', 1, '001', '2023-12-04 04:06:20', '2023-12-04 04:06:20'),
('4231fc24-1d4a-428e-9b09-cfcadc6341f7', NULL, NULL, 'admin@gmail.com', NULL, '$2b$10$2SfyIVuJXdpkk2QfknUXhuI5Tegpfutmm4onuHhIwUgGPUTOEl8Pa', 1, '000', '2023-12-04 04:06:20', '2023-12-04 04:06:20'),
('d1d3d5a1-00bc-4a85-b7bb-b7925f17e8c2', NULL, NULL, 'user1.1@gmail.com', NULL, '$2b$10$NGeX30bkfHyDHuDAUIClzeySnLnY3Ffvj1rQQR3ntszILT6eDIX.S', 0, '002', '2023-12-04 04:15:46', '2023-12-04 04:15:46');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `Albums`
--
ALTER TABLE `Albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`);

--
-- Chỉ mục cho bảng `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`),
  ADD KEY `mediaId` (`mediaId`);

--
-- Chỉ mục cho bảng `Favorites`
--
ALTER TABLE `Favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `mediaId` (`mediaId`);

--
-- Chỉ mục cho bảng `Histories`
--
ALTER TABLE `Histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `mediaId` (`mediaId`);

--
-- Chỉ mục cho bảng `Medias`
--
ALTER TABLE `Medias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`),
  ADD KEY `albumId` (`albumId`);

--
-- Chỉ mục cho bảng `PlayListAndMusics`
--
ALTER TABLE `PlayListAndMusics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playListId` (`playListId`),
  ADD KEY `mediaId` (`mediaId`);

--
-- Chỉ mục cho bảng `Playlists`
--
ALTER TABLE `Playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`);

--
-- Chỉ mục cho bảng `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `roleCode` (`roleCode`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `Albums`
--
ALTER TABLE `Albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`mediaId`) REFERENCES `Medias` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `Favorites`
--
ALTER TABLE `Favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`mediaId`) REFERENCES `Medias` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `Histories`
--
ALTER TABLE `Histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`mediaId`) REFERENCES `Medias` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `Medias`
--
ALTER TABLE `Medias`
  ADD CONSTRAINT `medias_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `medias_ibfk_2` FOREIGN KEY (`albumId`) REFERENCES `Albums` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `PlayListAndMusics`
--
ALTER TABLE `PlayListAndMusics`
  ADD CONSTRAINT `playlistandmusics_ibfk_1` FOREIGN KEY (`playListId`) REFERENCES `Playlists` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `playlistandmusics_ibfk_2` FOREIGN KEY (`mediaId`) REFERENCES `Medias` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `Playlists`
--
ALTER TABLE `Playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleCode`) REFERENCES `Roles` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
