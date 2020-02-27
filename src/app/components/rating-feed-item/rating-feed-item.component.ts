import { Component, OnInit, Input } from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import IRating from '../../models/IRating';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

@Component({
  selector: 'app-rating-feed-item',
  templateUrl: './rating-feed-item.component.html',
  styleUrls: ['./rating-feed-item.component.scss'],
})

export class RatingFeedItemComponent implements OnInit {

  @Input() ratingData: IRating;
  @Input() showAuthor: boolean;

  constructor() { }

  ngOnInit() {}

  epochToTimeAgo() {
    const sincePost = timeAgo.format(this.ratingData.date)
    return sincePost
  }

}
