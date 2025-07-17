#File for indicators
import talib
from pandas import Series

def SMA(series: Series, timeperiod: int = 14) -> Series:
    return talib.SMA(series, timeperiod=timeperiod)
