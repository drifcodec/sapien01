"""
Raspberry Pi Pico (MicroPython) exercise:
work with SIM868 GSM/GPRS/GNSS Module
"""
import machine
import os
import utime
import binascii

# using pin defined
led_pin = 25  # onboard led
pwr_en = 14  # pin to control the power of the module
uart_port = 0
uart_baute = 115200

APN = "internet"

oil = 0
current = 0
status = "online"
packetArr = []

#temp of pico pi s
TempSensor = machine.ADC(4)
conversion_factor = 3.3 / 65535 

# uart setting
uart = machine.UART(uart_port, uart_baute)
print(os.uname())

# LED indicator on Raspberry Pi Pico
led_onboard = machine.Pin(led_pin, machine.Pin.OUT)

def led_blink():
    led_onboard.value(1)
    utime.sleep(1)
    led_onboard.value(0)
    utime.sleep(1)
    led_onboard.value(1)
    utime.sleep(1)
    led_onboard.value(0)
    utime.sleep(1)
    led_onboard.value(1)
    utime.sleep(1)
    led_onboard.value(0)
    utime.sleep(1)
    led_onboard.value(1)
    utime.sleep(1)
    led_onboard.value(0)
    utime.sleep(1)
    led_onboard.value(1)
    utime.sleep(1)
    led_onboard.value(0)
    utime.sleep(1)
    led_onboard.value(1)

# power on/off the module
def power_on_off():
    pwr_key = machine.Pin(pwr_en, machine.Pin.OUT)
    pwr_key.value(1)
    utime.sleep(2)
    pwr_key.value(0)

def wait_resp_info(timeout=2000):
    prvmills = utime.ticks_ms()
    info = b""
    while (utime.ticks_ms()-prvmills) < timeout:
        if uart.any():
            info = b"".join([info, uart.read(1)])
    print(info.decode())
    return info

# Send AT command
def send_at(cmd, back, timeout=2000):
    rec_buff = b''
    uart.write((cmd+'\r\n').encode())
    prvmills = utime.ticks_ms()
    while (utime.ticks_ms()-prvmills) < timeout:
        if uart.any():
            rec_buff = b"".join([rec_buff, uart.read(1)])
    if rec_buff != '':
        if back not in rec_buff.decode():
            print(cmd + ' back:\t' + rec_buff.decode())
            return 0
        else:
            print(rec_buff.decode())
            return 1
    else:
        print(cmd + ' no responce')

# Send AT command and return response information
def send_at_wait_resp(cmd, back, timeout=2000):
    rec_buff = b''
    uart.write((cmd + '\r\n').encode())
    prvmills = utime.ticks_ms()
    while (utime.ticks_ms() - prvmills) < timeout:
        if uart.any():
            rec_buff = b"".join([rec_buff, uart.read(1)])
    if rec_buff != '':
        if back not in rec_buff.decode():
            print(cmd + ' back:\t' + rec_buff.decode())
        else:
            print(rec_buff.decode())
    else:
        print(cmd + ' no responce')
    # print("Response information is: ", rec_buff)
    return rec_buff

# Module startup detection
def check_start():
    while True:
        # simcom module uart may be fool,so it is better to send much times when it starts.
        uart.write(bytearray(b'ATE1\r\n'))
        utime.sleep(2)
        uart.write(bytearray(b'AT\r\n'))
        rec_temp = wait_resp_info()
        if 'OK' in rec_temp.decode():
            print('SIM868 is ready\r\n' + rec_temp.decode())
            break
        else:
            power_on_off()
            print('SIM868 is starting up, please wait...\r\n')
            utime.sleep(8)

# Check the network status
def check_network():
    for i in range(1, 3):
        if send_at("AT+CGREG?", "0,1") == 1:
            print('SIM868 is online\r\n')
            break
        else:
            print('SIM868 is offline, please wait...\r\n')
            utime.sleep(5)
            continue
    send_at("AT+CPIN?", "OK")
    send_at("AT+CSQ", "OK")
    send_at("AT+COPS?", "OK")
    send_at("AT+CGATT?", "OK")
    send_at("AT+CGDCONT?", "OK")
    send_at("AT+CSTT?", "OK")
    send_at("AT+CSTT=\""+APN+"\"", "OK")
    send_at("AT+CIICR", "OK")
    send_at("AT+CIFSR", "OK")
###############-------#####################
    
# Bearer Configure
def bearer_config():
    send_at('AT+SAPBR=3,1,\"Contype\",\"GPRS\"', 'OK')
    send_at('AT+SAPBR=3,1,\"APN\",\"'+APN+'\"', 'OK')
    send_at('AT+SAPBR=1,1', 'OK')
    send_at('AT+SAPBR=2,1', 'OK')
#   send_at('AT+SAPBR=0,1', 'OK')

# HTTP GET TEST
def http_get(url):
    send_at('AT+HTTPINIT', 'OK')
    send_at('AT+HTTPSSL=1', 'OK')
    send_at('AT+HTTPPARA=\"CID\",1', 'OK')
    send_at('AT+HTTPPARA=\"URL\",\"'+url+'\"', 'OK')
    if send_at('AT+HTTPACTION=0', '200', 3000):
        uart.write(bytearray(b'AT+HTTPREAD\r\n'))
        rec_buff = wait_resp_info(3000)
        print("resp is :", rec_buff.decode())
    else:
        print("Get HTTP failed, please check and try again\n")
    send_at('AT+HTTPTERM', 'OK')

# HTTP POST TEST
def http_post(url,data,content):
    post_status = 0
    send_at('AT+HTTPINIT', 'OK')
    send_at('AT+HTTPSSL=0', 'OK')
    send_at('AT+HTTPPARA=\"CID\",1', 'OK')
    send_at('AT+HTTPPARA=\"URL\",\"'+url+'\"', 'OK')
    send_at('AT+HTTPPARA=\"CONTENT\",\"' + content + '\"', 'OK')
    if send_at('AT+HTTPDATA='+str(len(data))+',10000', 'DOWNLOAD', 5000):
        uart.write(bytearray(data))
        utime.sleep(5)
        rec_buff = wait_resp_info()
        if 'OK' in rec_buff.decode():
            print("UART data is read!\n")
        if send_at('AT+HTTPACTION=1', '200', 10000):
            print("POST successfully!\n")
            print(rec_buff)
            post_status = 1
        else:
            print("POST failed\n")
        send_at('AT+HTTPTERM', 'OK')
    else:
        print("HTTP Post failed, please try again!\n")
    return post_status

# Get the gps info
def get_gps_info():
    count = 0
    print('Start GPS session...')
    send_at('AT+CGNSPWR=1', 'OK')
    utime.sleep(2)
    for i in range(1, 10):
        uart.write(bytearray(b'AT+CGNSINF\r\n'))
        rec_buff = wait_resp_info()
        if ',,,,' in rec_buff.decode():
            print('GPS is not ready')
#            print(rec_buff.decode())
            if i >= 9:
                print('GPS positioning failed, please check the GPS antenna!\r\n')
                send_at('AT+CGNSPWR=0', 'OK')
                global lat
                lat = "n/a"
                global long
                long = "n/a"
            else:
                utime.sleep(2)
                continue
        else:
            if count <= 3:
                count += 1
                print('GPS info:')
                print(rec_buff.decode())
                res = rec_buff.decode().split(',')
                global lat
                lat = res[3]
                global long
                long = res[4]
            else:
                send_at('AT+CGNSPWR=0', 'OK')
                break

# main program
led_blink()
check_start()
check_network()
bearer_config()
found_gps_ords = False

while True:
    data = TempSensor.read_u16() * conversion_factor
    temperature = 27-(data-0.706)/0.001721
    packetArr.append('{"device_id":"pico_CPT_test_01","sensor_oil":'+str(oil)+',"sensor_current":'+str(current)+',"sensor_temp":'+str(round(temperature,1))+',"device_status":"'+status+'"}')
    tempPacketArr = packetArr
    for packet in tempPacketArr:
        if http_post('http://cpma.herokuapp.com/api/device_activity/create',packet,'application/json'):
            packetArr.remove(packet)
    print(packetArr)
    utime.sleep(5)
    led_blink()
