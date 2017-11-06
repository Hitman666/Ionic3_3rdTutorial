import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AdMobPro } from '@ionic-native/admob-pro';
import { Platform } from 'ionic-angular';

@Component({
    selector: 'page-calculator',
    templateUrl: 'calculator.html'
})
export class CalculatorPage {
    constructor(public navCtrl: NavController, private alertCtrl: AlertController, private admob: AdMobPro, private platform: Platform) {
        this.platform.ready().then(() => {
            var admobid = {
                banner: 'ca-app-pub-7957971173858308/5068937357',
                interstitial: 'ca-app-pub-7957971173858308/5667703151'
            };

            this.admob.createBanner({
                adId: admobid.banner,
                isTesting: true,
                autoShow: true,
                position: this.admob.AD_POSITION.BOTTOM_CENTER
            })

            this.admob.prepareInterstitial({
                adId: admobid.interstitial,
                isTesting: true,
                autoShow: false
            })
        });
    }

    result = '';
    counter = 1;

    showInterstitialAd() {
        if (AdMobPro) {
            this.admob.showInterstitial();
        }
    }

    btnClicked(btn) {
        if (btn == 'C') {
            this.result = '';
        }
        else if (btn == '=') {
            if (this.result == '') {
                return;
            }

            try {
                this.result = eval(this.result).toFixed(2);

                if (this.counter++ == 5) {
                    this.showInterstitialAd();
                    this.counter = 0;
                }
            } catch (error) {
                this.showAlert();
                this.result = '';
            }
        }
        else {
            this.result += btn;
        }
    }

    showAlert() {
        this.alertCtrl.create({
            title: 'Malformed input',
            subTitle: 'Ooops, please try again...',
            buttons: ['Dismiss']
        }).present();
    }
}