import { Component, OnInit, Input } from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import IRoom from '../../models/IRoom';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

@Component({
  selector: 'app-detail-feed-item',
  templateUrl: './detail-feed-item.component.html',
  styleUrls: ['./detail-feed-item.component.scss'],
})

export class DetailFeedItemComponent implements OnInit {

  @Input() roomData: IRoom;
  @Input() showAuthor: boolean;

  constructor() { }

  ngOnInit() {}

  epochToTimeAgo() {
    const sincePost = timeAgo.format(this.roomData.date)
    return sincePost
  }

}
