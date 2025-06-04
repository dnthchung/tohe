@echo off
setlocal enableDelayedExpansion

:: Tạo thư mục chứa các file JSON nếu chưa tồn tại
if not exist 12_con_giap_json md 12_con_giap_json

:: Danh sách 12 con giáp
set "congiap[1]=ty"
set "congiap[2]=suu"
set "congiap[3]=dan"
set "congiap[4]=mao"
set "congiap[5]=thin"
set "congiap[6]=ti"
set "congiap[7]=ngo"
set "congiap[8]=mui"
set "congiap[9]=than"
set "congiap[10]=dau"
set "congiap[11]=tuat"
set "congiap[12]=hoi"

echo Đang tạo các file JSON trống...

for /L %%i in (1,1,12) do (
    set "ten_con_giap=!congiap[%%i]!"
    set "file_name=12!ten_con_giap!.json"
    type nul > "12_con_giap_json\!file_name!"
    echo Đã tạo: !file_name!
)

echo.
echo Hoàn thành! Các file JSON trống đã được tạo trong thư mục "12_con_giap_json".

pause