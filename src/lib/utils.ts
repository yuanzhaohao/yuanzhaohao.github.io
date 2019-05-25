export function formatTime(timestamp: number, format: string) {
  const time = new Date(timestamp);
  const date: { [key: string]: number } = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S+': time.getMilliseconds(),
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      const d = String(date[k]);
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? d : ('00' + d).substr(d.length));
    }
  }
  return format;
}

export const sideBarRoutes = [
  {
    pathname: '/',
    title: 'Home',
    icon: 'home',
  },
  {
    pathname: '/about',
    title: 'About me',
    icon: 'user',
  },
];

export const sideBarContact = [
  {
    title: 'Github',
    icon: 'github',
    link: 'https://github.com/yuanzhaohao',
  },
  {
    title: 'Linkedin',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/zhaohao-yuan-6595967b/',
  },
  {
    title: '知乎',
    icon: 'book',
    link: 'https://www.zhihu.com/people/yuan-jing-65/activities',
  },
];
