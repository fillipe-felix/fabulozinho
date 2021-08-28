import {Component} from '@angular/core';

@Component({
    selector: 'app-comprovante-venda',
    templateUrl: './comprovante-venda.component.html',
    styleUrls: ['./comprovante-venda.component.css']
})
export class ComprovanteVendaComponent {

    // status: boolean = false;
    // usbPrintDriver: UsbDriver;
    // webPrintDriver: WebPrintDriver;
    // ip: string = '';
    //
    // constructor(private printService: PrintService) {
    //     this.usbPrintDriver = new UsbDriver();
    //     this.printService.isConnected.subscribe(result => {
    //         this.status = result;
    //         if (result) {
    //             console.log('Connected to printer!!!');
    //         } else {
    //             console.log('Not connected to printer.');
    //         }
    //     });
    // }
    //
    // requestUsb() {
    //     this.usbPrintDriver.requestUsb().subscribe(result => {
    //         this.printService.setDriver(this.usbPrintDriver);
    //
    //         // this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
    //     });
    // }
    //
    // connectToWebPrint() {
    //     this.webPrintDriver = new WebPrintDriver(this.ip);
    //     this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
    // }
    //
    // print(driver: PrintDriver) {
    //     this.printService.init()
    //         .setBold(true)
    //         .writeLine('Hello World!')
    //         .setBold(false)
    //         .feed(4)
    //         .cut('full')
    //         .flush();
    // }
}
