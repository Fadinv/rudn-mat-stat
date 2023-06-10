# rudn-mat-stat

Для начала работы в корневой директории пропишите <code>npm i</code>

Далее используя токен укажите его в файле marketdata/download_md.sh.
В файле <code>figi.txt</code> оставьте идентификаторы тех котировок, которые вы хотите получить.
Перейдите в директорию marketdata и пропишите команду <code>bash download_md.sh</code>


Далее вызываются команды <code>getPriceByYear</code> и <code>linearDependence</code> для обработки данных.