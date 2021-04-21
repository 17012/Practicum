# imoort relatefile
import sys
from threading import Thread
import drivers
from time import sleep
import  RPi.GPIO as GPIO
import random

# setup hardware
GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN,pull_up_down=GPIO.PUD_UP)
GPIO.setup(24, GPIO.IN,pull_up_down=GPIO.PUD_UP)
display = drivers.Lcd()

pin_list = [random.randint(0,9) for i in range(4)]
focus_pin = 0
submitted = False;

def LCD_show_text(text1, text2):
    global display
    display.lcd_display_string(text1, 1)
    display.lcd_display_string(text2, 2)

def LCD_Display():
    global pin_list
    global focus_pin
    global display
    # pin_display = ' '.join(str(pin_list[i]) if i != focus_pin else "[%s]" % (str(pin_list[i]))  for i in range(len(pin_list)))
    pin_display = ""
    for i in range(len(pin_list)):
        if i == focus_pin:
            pin_display += "[%s] " %(str(pin_list[i]))
        else:
            pin_display += " %s  " %(str(pin_list[i]))
    display.lcd_display_string("Enter your pin", 1)
    display.lcd_display_string(pin_display, 2)

def press_btn():
    global pin_list
    global focus_pin
    global submitted
    # while True:
    left_btn = GPIO.input(24)
    right_btn = GPIO.input(18)
    if not left_btn and not right_btn :
        # print("submitted!")
        print(''.join(str(pin) for pin in pin_list))
        submitted = True
        # continue
    if left_btn == False:
        focus_pin += 1
        focus_pin %= 4
        # print("cursor : ", focus_pin)
    if right_btn == False:
        pin_list[focus_pin] += 1
        pin_list[focus_pin] %= 10
        # print("number : ", pin_list[focus_pin])

try:
    while not submitted:
        LCD_Display()
        press_btn()
        sleep(0.07)
    if submitted:
        LCD_show_text("Hardware wallet", "              ;)")
        sleep(1.5)
        sys.exit()
        display.lcd_clear()
except KeyboardInterrupt:
    display.lcd_clear()