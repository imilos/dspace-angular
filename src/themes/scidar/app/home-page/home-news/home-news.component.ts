import { Component } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html'
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {
  myPix = ['banner_01.jpg', 'banner_02.jpg', 'banner_03.jpg', 'banner_04.jpg', 'banner_05.jpg', 'banner_06.jpg', 'banner_07.jpg', 'banner_08.jpg', 'banner_09.jpg', 'banner_10.jpg', 'banner_11.jpg', ];
  randomNumber = Math.floor(Math.random() * this.myPix.length);
}
