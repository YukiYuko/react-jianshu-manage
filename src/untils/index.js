import dayjs from "dayjs";

export default {
  formatDate(time){
    if(!time)return '';
    let date = new Date(time);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  },
  day_format(time) {
    if(!time)return '';
    return dayjs(time).format("YYYY-MM-DD HH:mm")
  }
}
