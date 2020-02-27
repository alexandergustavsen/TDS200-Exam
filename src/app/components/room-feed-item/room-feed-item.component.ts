import { Component, OnInit, Input } from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import IRoom from '../../models/IRoom';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

@Component({
  selector: 'app-room-feed-item',
  templateUrl: './room-feed-item.component.html',
  styleUrls: ['./room-feed-item.component.scss'],
})

export class RoomFeedItemComponent implements OnInit {
  
  @Input() roomData: IRoom;
  @Input() showAuthor: boolean;

  constructor() { }

  ngOnInit() {}

  epochToTimeAgo() {
    const sincePost = timeAgo.format(this.roomData.date)
    return sincePost
  }

}
