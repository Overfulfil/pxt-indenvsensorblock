//% weight=0 color=#3CB371 icon="\uf140" block="Indoor Environment Sensor"

namespace indenvsensor {

    /* CJMCU-8118 HDC1080 Temp&Humidity sensor addr 0x40 */
    /* CJMCU-8118 CCS811 Gas sensor addr 0x5A */
    //% blockId="indenvStart" block="IndEnv Sensor Start"
    //% blockGap=2 weight=79
    export function indenvStart(): boolean {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    basic.pause(200)
	    /* CJMCU-8118 CCS811 addr 0x5A reg 0x20 Read Device ID = 0x81 */
	    pins.i2cWriteNumber(90,32,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if (pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) != 129) {
		    return false
	    }
	    basic.pause(200)
	    /* CJMCU-8118 AppStart CCS811 addr 0x5A register 0xF4 */
	    pins.i2cWriteNumber(90,244,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    /* CJMCU-8118 CCS811 Driving Mode 1 addr 0x5A register 0x01 0x0110 */
	    pins.i2cWriteNumber(90,272,NumberFormat.UInt16BE,false)
	    basic.pause(200)
	    /* CJMCU-8118 CCS811 Status addr 0x5A register 0x00 return 1 byte */	    
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if (pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) %2 !=0) {
		    return false
	    }
	    basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if (Math.idiv(pins.i2cReadNumber(90, NumberFormat.UInt8LE, false), 16) !=9) {
		    return false
	    }
	    basic.pause(200)
	    return true
    }
	

    /* CJMCU-8118 CCS811 read eCO2 addr 0x5A register 0x02 return 2 bytes */
    //% blockId="indenvgeteCO2" block="IndEnv get eCO2"
    //% blockGap=2 weight=76
    export function indenvgeteCO2(): number {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,2,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    return pins.i2cReadNumber(90, NumberFormat.UInt16BE, false)
    }

    /* CJMCU-8118 CCS811 read VTOC addr 0x5A register 0x02 return 2 bytes */
    //% blockId="indenvgetTVOC" block="IndEnv get TVOC"
    //% blockGap=2 weight=75
    export function indenvgetTVOC(): number {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,2,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    return (pins.i2cReadNumber(90, NumberFormat.UInt32BE, false) % 65536)
    }


    /* CJMCU-8118 CCS811 Gas sensor addr 0x5A register 0x00 return 1 byte */
    //% blockId="indenvGasStatus" block="IndEnv Gas Status"
    //% blockGap=2 weight=74
    export function indenvGasStatus(): number {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    let GasStatus = pins.i2cReadNumber(90, NumberFormat.UInt8LE, false)
	    basic.pause(200)
	    return GasStatus
    }


    /* CJMCU-8118 CCS811 Gas sensor Data Ready, Gas Status bit3=1 */
    //% blockId="indenvGasReady" block="IndEnv Gas Data Ready"
    //% blockGap=2 weight=73
    export function indenvGasReady(): boolean {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if ((pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) % 16) !=8) {
		    return false
	    }
	    return true
    }

}
