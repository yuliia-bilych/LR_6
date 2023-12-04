var arrConcerts = [];
arrConcerts[0] = {
  group: "The Weeknd",
  place: "Kyiv, Stereo Plaza",
  date: "06.12.2023"
};
arrConcerts[1] = {
  group: "Imagine Dragons",
  place: "Lviv, ARENA Lviv",
  date: "22.12.2023"
};
arrConcerts[2] = {
  group: "Justin Bieber",
  place: "Kharkiv, Arena Kharkiv",
  date: "10.12.2023"
};
arrConcerts[3] = {
  group: "Adele",
  place: "-",
  date: "15.12.2023"
};
arrConcerts[4] = {
    group: "Adele",
    place: "-",
    date: "05.12.2023"
};
arrConcerts[5] = {
    group: "BTS",
    place: "Seul",
    date: "05.10.2023"
};

let html = "";
let notice;

function diff_day(text) {
  var currentDate = new Date("2023-12-05");
  var date1 = new Date(text.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
  let timeDiff = date1.getTime() - currentDate.getTime();
  let daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

function ras_diff_Days(content, place) {
  let DiffDays = diff_day(content);
  if (DiffDays < 0) {
    notice = `Концерт уже відбувся ${Math.abs(DiffDays)} днів тому`;
  } else {
    switch (DiffDays) {
      case 0:
        notice = 'Концерт йде сьогодні!';
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        notice = 'Купити квиток вже не можна!';
        break;
      case 5:
        notice = 'Сьогодні останній день для покупки квитка';
        break;
      default:
        notice = "";
    }
    if (!place || place === "-") {
      notice += ' Невідома адреса проведення концерту';
    }
  }
  return DiffDays;
}

function output(cell, i, array) {
  let content = cell['date'];
  let place = cell['place'];
  let DiffDays = ras_diff_Days(content, place);
  html = html + "<tr>";
  switch (DiffDays) {
    case 0:
      html = html + "<tr style='background:salmon;'>";
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      html = html + "<tr style='background:yellow;'>";
      break;
    case 5:
      html = html + "<tr style='background:red;'>";
      break;
    default:
      html = html + "<tr>";
  }
  for (let sign in cell) {
    html = html + '<td>' + cell[sign] + '</td>';
  }
  html = html + '<td>' + DiffDays + '</td>';
  html = html + '<td>' + notice + '</td>';
  html = html + "</tr>";
}

function result() {
  html = "<table style='table; background:oldlace;'>";
  html = html + "<tr><td>Група</td>" + "<td>Місце проведення</td><td>Дата концерту</td><td>Дні до концерту</td><td>Повідомлення</td></tr>";
  arrConcerts.forEach(output);
  html = html + "</table>";
  document.getElementById('finish').innerHTML = html;
}

result();
