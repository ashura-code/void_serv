const { encode, decode } = require('url-encode-decode');
// const { red, blue, bold, bgBlack, cyan, magenta, green } = require('kleur');

async function getResults(name) {
  const data = await fetch(
    `https://www.jiosaavn.com/api.php?p=1&q=${name}&_format=json&_marker=0&api_version=4&ctx=wap6dot0&n=20&__call=search.getResults`
  );
  if (data.status > 199) {
    const res = await data.json();
    return res.results;
  } else {
    console.log(data);
  }
}

async function getLink(id) {
  const data = await fetch(
    `https://www.jiosaavn.com/api.php?__call=song.generateAuthToken&url=${id}&bitrate=128&api_version=4&_format=json&ctx=wap6dot0&_marker=0`
  );
  if (data.status >= 200) {
    const res = await data.json();
    let split1 = res.auth_url.split('?')[0];
    let split2 = split1.split('com');
    return 'https://aac.saavncdn.com' + split2[1];
  }
}

async function main(name) {
  let res_arr = [];
  const arr = await getResults(name);

  for (const item of arr) {
    let obj = {}
    // console.log(
    //   '____________________________________________________________________________________________________________'
    // );
    let temp_name = item.title;
    let name = temp_name.replace(/&quot;/g, '"');
    // console.log(`\x1B[4m\n\x1B[0m`);
    // console.log(bold(blue(name)));
    obj.name = name;
    let image = item.image;
    obj.image = image;
    let temp_subtitle = item.subtitle;
    let subtitle = item.subtitle.replace(/&quot;/g, '"');
    obj.subtitle = subtitle;
    // console.log(magenta(subtitle));
    let encoded = encode(item.more_info.encrypted_media_url);

    const url_ = async () => {
      let url = await getLink(encoded);
      return url;
    };

    const result = await url_();
    // console.log(result);
    obj.url = result;

    res_arr.push(obj)
  }

  return (res_arr);
}

// main('blinding lights'); // give the song name to be fetched as an argument


module.exports =  main;