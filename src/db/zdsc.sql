/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : zdsc

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 03/03/2022 15:01:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for zd_goods
-- ----------------------------
DROP TABLE IF EXISTS `zd_goods`;
CREATE TABLE `zd_goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名，唯一，不为空',
  `goods_price` char(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '价格',
  `goods_sizeNUm` char(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '库存',
  `goods_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品图片',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `goods_name`(`goods_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zd_goods
-- ----------------------------
INSERT INTO `zd_goods` VALUES (1, '测试', '10', '102', 'upload_33cff15dfaabbe14a3e8416b804beaac.jpg', '2022-03-03 01:52:45', '2022-03-03 01:52:45', NULL);
INSERT INTO `zd_goods` VALUES (2, '测试1', '11', '95', 'upload_33cff15dfaabbe14a3e8416b804beaac.jpg', '2022-03-03 01:52:50', '2022-03-03 01:52:50', NULL);
INSERT INTO `zd_goods` VALUES (3, '测试2', '12', '36', 'upload_33cff15dfaabbe14a3e8416b804beaac.jpg', '2022-03-03 01:52:57', '2022-03-03 01:52:57', '2022-03-03 02:25:57');

-- ----------------------------
-- Table structure for zd_users
-- ----------------------------
DROP TABLE IF EXISTS `zd_users`;
CREATE TABLE `zd_users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名，唯一，不为空',
  `password` char(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `is_admin` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为管理员，1-是 0-不是',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zd_users
-- ----------------------------
INSERT INTO `zd_users` VALUES (1, 'lei', '$2a$10$hFdylc1vdFohQFTde0z82uYs4M/JwHMmwVt/Xn1d2n1DxV5iPtWem', 0, '2022-02-25 08:16:25', '2022-02-25 08:16:25');
INSERT INTO `zd_users` VALUES (19, 'lin', '$2a$10$hFdylc1vdFohQFTde0z82uYs4M/JwHMmwVt/Xn1d2n1DxV5iPtWem', 1, '2022-03-02 03:51:18', '2022-03-02 03:51:18');

SET FOREIGN_KEY_CHECKS = 1;
