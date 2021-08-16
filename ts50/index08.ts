/*
 * @Author: wangyunbo
 * @Date: 2021-08-13 13:37:40
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-16 09:18:18
 * @FilePath: \dayByday\ts50\index08.ts
 * @Description: file content
 */

type Talk = {
  title: string,
  abstract: string,
  speaker: string,
}

type Conference = {
  title: string,
  description: string,
  date: Date,
  capacity: number,
  rsvp: number,
  kind: string,
  location: string,
  price: number,
  talks: Talk[]
}

type Webinar = {
  title: string,
  description: string,
  date: Date,
  capcacity: number,
  rsvp: number,
  kind: string,
  url: string,
  price?: number,
  talks: Talk
}

type TechEventBase = {
  title: string,
  description: string,
  date: Date,
  capacity: number,
  rsvp: number,
  kind: string
}

type Conference2 = TechEventBase & {
  location: string,
  price: number,
  talks: Talk[]
}

type Meetup = TechEventBase & {
  location: string,
  price: string,
  talks: Talk[]
}

type Webinar2 = TechEventBase & {
  url: string,
  price?: number,
  talks: Talk
}

type TechEvent = Webinar2 | Conference2 | Meetup;

function printEvent(event: TechEvent) {
  if (event.price) {
    if (typeof event.price === 'number') {
      console.log('Price in EUR: ', event.price);
    } else {
      console.log('it is free');
    }
  }

  if (Array.isArray(event.talks)) {
    event.talks.forEach(talk => {
      console.log(talk.title);
    })
  } else {
    console.log(event.talks.title);
    
  }
}