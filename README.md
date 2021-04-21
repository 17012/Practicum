# [กลุ่มที่ 7 : FOMOs](https://ecourse.cpe.ku.ac.th/tpm/project/practicum-63s) #


โปรเจคนี้เป็นส่วนหนึ่งของรายวิชา _Practicum for Computer Engineering 01204223_ ภาคปลาย ปีการศึกษา 2563

## Over view
* [Source code program](https://github.com/17012/Practicum)
    * [Backend](/backend)
    * [Frontend](/frontend)
    * [Hardware](/hardware)
* [Schematic](/Schematic_hardware.png)
* [Readme](/README.md)
* [Workpiece photo](/workpiecePhoto)
* [license](/license.txt)

ชื่อโครงงาน : WallPi
โครงงานนี้เป็นส่วนหนึ่งของรายวิชา 01204223 Practicum for Computer Engineering ภาคปลาย ปีการศึกษา 2563 หมู่ 11,12

สมาชิก :
6210500561 นายศักดิ์ชัย  วชิรเมธากร
6210500510 นายณัฐภัทร ศรีวิชัยลำพัน
ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์

### รายละเอียดโปรเจค
        โปรเจคนี้เป็นโปรเจคที่ทำขึ้นเพื่อสร้าง DIY Hardware wallet บน Raspberry pi โดยได้สร้างกระเป๋าบน Ethereum testnet (Rinkeby) เพื่อเป็นการทดสอบ Hardware wallet เพื่อในการใช้งานจริงสำหรับ Mainnet ในอนาคต ซึ่งโปรเจคเรา จะมีส่วนของหน้าเว็บที่ใช้กรอกรหัสยืนยันกับ Hardware ก่อนที่จะ Sign Transaction เพื่อความปลอกภัยในโลก Crypto และ Defi
_Backend_ - ใช้ Node.js ในการรันระบบ server เป็นส่วนของ API ที่ใช้ในการดูข้อมูลภายใน wallet รวมถึงการ sign transaction ด้วย
_Frontend_ - ใช้ React.js เป็น Framework หลักในการสร้าง WebApp ควบคู่กับ Tailwind ที่เป็น CSS Framework ในการสร้าง WebApp ขึ้นมาโดยเริ่มต้น จะมีการกรอก seed phase และ setup pin สำหรับการใช้งานด้วย
_Hardware_ - ใช้ Python ในการเขียนโปรแกรม โดย pin ที่ใส่ลงไปต้องตรงกับ pin ที่ตั้งไว้ เพื่อความปลอดภัยมในการกรอก pin เมื่อเริ่มต้นการกรอก hardware จะสุ่ม pin มาให้ 4 ค่าที่ไม่ซ้ำกัน โดยผู้ใช้จพคุ้มปุ่มฝั่งซ้ายในการกดรหัสขึ้น และฝั่งขวา ในการเลือกช่องใส่ pin เมื่อใส่ pin ถูกต้องแล้วกด 2 ปุ่มพร้อมกันจะเป็นการ submit!

### รายละเอียดไฟล์
- Backend - Folder ที่รวมไฟล์ที่เกี่ยวข้องกับระบบหลังบ้านเอาไว้
    * ecosystem.config.js - ไฟล์ config ของ backend
    * package.json - ไฟล์ที่รวม package ที่ใช้ใน backend
    * server.js - ไฟล์หลักที่ใช้ในการรัน Backend ซึ่งเป็น API การการเข้าถึงข้อมูลของ Wallet และจำลอง ETH chain ออกมา
- Frontend - Folder ที่รวมไฟล์ที่เกี่ยวข้องของ Frontend เอาไว้
    * build เป็นโฟล์เดอร์ที่ build แล้วของ React.js เป็น static เรียบร้อย พร้อม run serve
    * public โฟล์เดอร์ที่เป็น HTML ที่ใช้ตอน Public โดย content ข้างในจะนำมาจาก /src อีกที
    * src เป็นโฟลเดอร์หลักที่ใช้ในการ development 
- Hardware - Folder ที่ใช้โปรแกรม hardware
    * drivers - เป็น Folder ที่ใช้กับ driver ของ lcd 1620A กับ i2c
    * set_pin_display.py - เป็นไฟล์ที่ใช้รันเมื่อต้องการใช้ Hardware


### รายเอียด library/framework 
Backend - Node.js
Frontend - React.js, tailwindcss
Hardware - Python, sys, threading, time, RPi.GPIO, random


### รายการอุปกรณ์ที่ใช้
- Raspberry pi model 3 B+ 1 เครื่อง
- SD card 64 gb 1 อัน
- Micro-usb 1 เส้น
- Button 2 ปุ่ม
- LED 1620A with I2C 1 ชุด
- Breadboard 1 ชิ้น
- Male to Female Cable Jumper Wire 8 เส้น