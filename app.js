const hasConfig=()=>window.SUPABASE_URL&&window.SUPABASE_ANON_KEY;
let sb=null;

/* Avvy dark-mode contrast patch: keep secondary controls readable across pages. */
(function installDarkModeContrastPatch(){
  const styleId = 'avvy-dark-mode-contrast-patch';
  const css = `
    html[data-theme="dark"] .secondary,
    html[data-theme="dark"] .pill,
    html[data-theme="dark"] .iconbtn,
    html[data-theme="dark"] .danger-link,
    html[data-theme="dark"] .gift-ui .gift-switch,
    html[data-theme="dark"] .gift-ui .pill,
    html[data-theme="dark"] .gift-ui .coin-title,
    html[data-theme="dark"] .gift-ui .gift-category h4,
    html[data-theme="dark"] .gift-ui .mascot-group h5,
    html[data-theme="dark"] .gift-ui .gift-btn span,
    html[data-theme="dark"] .gift-ui .event-coin h4 {
      color: var(--text, #f8edef) !important;
    }
    html[data-theme="dark"] .secondary:disabled,
    html[data-theme="dark"] button.secondary:disabled {
      color: #d9cbd0 !important;
      opacity: .8;
    }
    html[data-theme="dark"] .gift-ui {
      color: var(--text, #f8edef) !important;
      background: transparent !important;
    }
    html[data-theme="dark"] .gift-ui.gift-endurance,
    html[data-theme="dark"] .gift-ui.gift-collection,
    html[data-theme="dark"] .gift-ui .coin-group,
    html[data-theme="dark"] .gift-ui .event-group,
    html[data-theme="dark"] .gift-ui .gift-card,
    html[data-theme="dark"] .gift-ui .target-summary,
    html[data-theme="dark"] .gift-ui .gift-category,
    html[data-theme="dark"] .gift-ui .mascot-group,
    html[data-theme="dark"] .gift-ui .event-coin,
    html[data-theme="dark"] .gift-ui .collection-goal,
    html[data-theme="dark"] .gift-ui .empty {
      background: #2d2428 !important;
      color: #f8edef !important;
      border-color: #57434a !important;
      box-shadow: none !important;
    }
    html[data-theme="dark"] .gift-ui .gift-card.is-achieved {
      background: #3a2930 !important;
      border-color: #a75d72 !important;
    }
    html[data-theme="dark"] .gift-ui .gift-card.is-unachieved::before {
      background: #44363b !important;
      color: #e6d6dc !important;
    }
    html[data-theme="dark"] .gift-ui .target-main strong,
    html[data-theme="dark"] .gift-ui .target-main span,
    html[data-theme="dark"] .gift-ui .summary-label,
    html[data-theme="dark"] .gift-ui .coin-title,
    html[data-theme="dark"] .gift-ui .gift-category h4,
    html[data-theme="dark"] .gift-ui .mascot-group h5,
    html[data-theme="dark"] .gift-ui .event-coin h4,
    html[data-theme="dark"] .gift-ui .gift-btn span,
    html[data-theme="dark"] .gift-ui .gift-switch,
    html[data-theme="dark"] .gift-ui .empty {
      color: #f8edef !important;
    }
    html[data-theme="dark"] .gift-ui .progress {
      background: #49363d !important;
    }
    html[data-theme="dark"] .gift-ui .gift-btn {
      background: #3a2930 !important;
      border-color: #67434d !important;
      color: #fff0f4 !important;
    }
    html[data-theme="dark"] .gift-ui .gift-counter-minus,
    html[data-theme="dark"] .gift-ui [data-gift-minus],
    html[data-theme="dark"] .gift-ui [data-collection-minus] {
      background: #47363c !important;
      color: #fff0f4 !important;
      border-color: #75515c !important;
    }
    html[data-theme="dark"] .gift-ui .gift-counter-plus,
    html[data-theme="dark"] .gift-ui [data-gift-plus],
    html[data-theme="dark"] .gift-ui [data-collection-plus] {
      color: #ffffff !important;
    }
    html[data-theme="dark"] .gift-ui .gift-switch {
      background: #47363a !important;
      color: #fff0f4 !important;
      border-color: #75515c !important;
    }
  `;
  const install = () => {
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  };
  install();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
})();

if(hasConfig()&&window.supabase){
  sb=window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );
}

const TABS=[
  ['home','🏠','ホーム'],
  ['gift','🎁','ギフト'],
  ['entry','🚪','入室耐久'],
  ['pref','📍','都道府県'],
  ['mbti','🧠','MBTI'],
  ['zodiac','⭐','星座'],
  ['origift','🎨','オリギフ'],
  ['custom','✨','カスタム'],
  ['settings','⚙️','設定']
];

const PREF=[
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
  '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
  '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
  '熊本県','大分県','宮崎県','鹿児島県','沖縄県'
];

const MBTI=[
  'INTJ','INTP','ENTJ','ENTP',
  'INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ',
  'ISTP','ISFP','ESTP','ESFP'
];

const ZODIAC=[
  'おひつじ座','おうし座','ふたご座','かに座',
  'しし座','おとめ座','てんびん座','さそり座',
  'いて座','やぎ座','みずがめ座','うお座'
];

const OFFICIAL_GIFTS=[
  // 5C：文字系
  {name:'ええやん',coin:5,group:'文字系'},
  {name:'かわいい',coin:5,group:'文字系',variant:'blue'},
  {name:'GOD',coin:5,group:'文字系'},
  {name:'すやぴっぴ',coin:5,group:'文字系'},
  {name:'うれピーナッツ',coin:5,group:'文字系'},
  {name:'祝',coin:5,group:'文字系'},
  {name:'神回',coin:5,group:'文字系'},
  {name:'笑',coin:5,group:'文字系'},
  {name:'わかりみ',coin:5,group:'文字系'},
  {name:'うんうん',coin:5,group:'文字系'},
  {name:'草',coin:5,group:'文字系'},
  {name:'ｗｗ',coin:5,group:'文字系'},
  {name:'最高',coin:5,group:'文字系'},
  {name:'さすが',coin:5,group:'文字系'},
  {name:'えっ？',coin:5,group:'文字系'},
  {name:'NOT OK',coin:5,group:'文字系'},
  {name:'OK',coin:5,group:'文字系'},
  {name:'！？',coin:5,group:'文字系'},
  {name:'？',coin:5,group:'文字系'},
  {name:'かわいい♡',coin:5,group:'文字系',variant:'pink'},
  {name:'天才かよ',coin:5,group:'文字系'},
  {name:'たしカニ',coin:5,group:'文字系'},

  // 5C：アイテム系
  {name:'ハート',coin:5,group:'アイテム系'},
  {name:'おめでとう',coin:5,group:'アイテム系'},
  {name:'花束',coin:5,group:'アイテム系'},
  {name:'ペンライト(3本)',coin:5,group:'アイテム系'},
  {name:'ペンライト',coin:5,group:'アイテム系'},
  {name:'プレゼントボックス',coin:5,group:'アイテム系'},
  {name:'クリームソーダ',coin:5,group:'アイテム系'},
  {name:'音符',coin:5,group:'アイテム系'},
  {name:'バラ',coin:5,group:'アイテム系'},
  {name:'つぼみのバラ',coin:5,group:'アイテム系'},

  // 5C：Avvyケモず系（アヴィエル）
  {name:'パチパチ(アヴィエル)',coin:5,group:'Avvyケモず系',mascot:'アヴィエル'},
  {name:'おなかすいた(アヴィエル)',coin:5,group:'Avvyケモず系',mascot:'アヴィエル'},
  {name:'ごろ寝(アヴィエル)',coin:5,group:'Avvyケモず系',mascot:'アヴィエル'},
  {name:'チルい(アヴィエル)',coin:5,group:'Avvyケモず系',mascot:'アヴィエル'},
  {name:'もぐもぐ(アヴィエル)',coin:5,group:'Avvyケモず系',mascot:'アヴィエル'},
  {name:'わかる(アヴィエル)',coin:5,group:'Avvyケモず系',mascot:'アヴィエル'},

  // 5C：Avvyケモず系（でんきゅいぬ）
  {name:'ショック！(でんきゅいぬ)',coin:5,group:'Avvyケモず系',mascot:'でんきゅいぬ'},
  {name:'嬉しい！(でんきゅいぬ)',coin:5,group:'Avvyケモず系',mascot:'でんきゅいぬ'},
  {name:'いいね(でんきゅいぬ)',coin:5,group:'Avvyケモず系',mascot:'でんきゅいぬ'},
  {name:'充電中(でんきゅいぬ)',coin:5,group:'Avvyケモず系',mascot:'でんきゅいぬ'},
  {name:'おはよう！(でんきゅいぬ)',coin:5,group:'Avvyケモず系',mascot:'でんきゅいぬ'},

  // 5C：Avvyケモず系（げるくま）
  {name:'カチコチ(げるくま)',coin:5,group:'Avvyケモず系',mascot:'げるくま'},
  {name:'溶けちゃう(げるくま)',coin:5,group:'Avvyケモず系',mascot:'げるくま'},
  {name:'ただいま～(げるくま)',coin:5,group:'Avvyケモず系',mascot:'げるくま'},
  {name:'がんばれ(げるくま)',coin:5,group:'Avvyケモず系',mascot:'げるくま'},
  {name:'Big Thanks(げるくま)',coin:5,group:'Avvyケモず系',mascot:'げるくま'},
  {name:'乙(げるくま)',coin:5,group:'Avvyケモず系',mascot:'げるくま'},

  // 5C：Avvyケモず系（ヨルワール）
  {name:'しょぼぼーん(ヨルワール)',coin:5,group:'Avvyケモず系',mascot:'ヨルワール'},
  {name:'ごゆっくり(ヨルワール)',coin:5,group:'Avvyケモず系',mascot:'ヨルワール'},
  {name:'お大事に(ヨルワール)',coin:5,group:'Avvyケモず系',mascot:'ヨルワール'},
  {name:'いいね(ヨルワール)',coin:5,group:'Avvyケモず系',mascot:'ヨルワール'},
  {name:'おやすみ(ヨルワール)',coin:5,group:'Avvyケモず系',mascot:'ヨルワール'},

  // 5C：Avvyケモず系（クロル）
  {name:'照れ照れ(クロル)',coin:5,group:'Avvyケモず系',mascot:'クロル'},
  {name:'かまって(クロル)',coin:5,group:'Avvyケモず系',mascot:'クロル'},
  {name:'ありがとう(クロル)',coin:5,group:'Avvyケモず系',mascot:'クロル'},
  {name:'またね(クロル)',coin:5,group:'Avvyケモず系',mascot:'クロル'},

  // 5C：Avvyケモず系（ウパめろ）
  {name:'推し(ウパめろ)',coin:5,group:'Avvyケモず系',mascot:'ウパめろ'},
  {name:'たすかる(ウパめろ)',coin:5,group:'Avvyケモず系',mascot:'ウパめろ'},
  {name:'たましい(ウパめろ)',coin:5,group:'Avvyケモず系',mascot:'ウパめろ'},
  {name:'メラメラ(ウパめろ)',coin:5,group:'Avvyケモず系',mascot:'ウパめろ'},
  {name:'心配(ウパめろ)',coin:5,group:'Avvyケモず系',mascot:'ウパめろ'},
  {name:'おかえり(ウパめろ)',coin:5,group:'Avvyケモず系',mascot:'ウパめろ'},

  {name:'お茶',coin:50},
  {name:'アイスクリーム',coin:50},
  {name:'ミニケーキ',coin:50},

  {name:'ハート風船',coin:100},
  {name:'ペンライト振り',coin:100},

  {name:'乾杯',coin:200},
  {name:'キラキラ',coin:200},

  {name:'ドドド',coin:300},
  {name:'集中線',coin:300},

  {name:'尊い',coin:500},

  {name:'ハートラッシュ！(クロル)',coin:1000},
  {name:'ケモずファンファーレ',coin:1000},
  {name:'ビッグハートクッション',coin:1000},

  {name:'レインボーステージ',coin:2000},
  {name:'花火セレナーデ',coin:2000},

  {name:'100本のバラ',coin:5000}
];

const EVENT_GIFTS={
  '弾けるフルーツポップ':[
    {name:'フルーツキャンディ',coin:5},
    {name:'レコード',coin:5},
    {name:'ソーダ',coin:5},
    {name:'フルーツペンライト',coin:5},
    {name:'フルーツポンチ',coin:50}
  ],

  'ストリートジャック':[
    {name:'LOL(ネオン)',coin:5},
    {name:'ハート(ネオン)',coin:5},
    {name:'音符(ネオン)',coin:5},
    {name:'エナジードリンク(ネオン)',coin:5},
    {name:"Let's Go！",coin:50}
  ],

  '真夏のアメリカンダイナー':[
    {name:'フライドポテト',coin:5},
    {name:'コーラ',coin:5},
    {name:'Cool',coin:5},
    {name:'アイスキャンディー',coin:5},
    {name:'ストロベリーシェイク',coin:50}
  ],

  '夜空に響く祭囃子':[
    {name:'風車',coin:5},
    {name:'金魚',coin:5},
    {name:'ラムネ',coin:5},
    {name:'線香花火',coin:5},
    {name:'ドンッ！',coin:50}
  ],

  'チャイナバラエティ':[
    {name:'福',coin:5},
    {name:'扇',coin:5},
    {name:'チャーハン',coin:5},
    {name:'麻雀牌',coin:5},
    {name:'パンダまん',coin:50}
  ],

  'ハロウィンナイト':[
    {name:'ゴースト',coin:5},
    {name:'黒猫',coin:5},
    {name:'死神',coin:5},
    {name:'コウモリ',coin:5},
    {name:'ロリポップ',coin:50}
  ]
};

// イベントのON/OFFとは独立したシーズン限定ギフト
const SEASON_GIFTS=[
  {name:'ハロウィンナイト',coin:1000,season:'10月限定'}
];

const EVENT_KEYS=Object.keys(EVENT_GIFTS);

let state={
  tab:'home',
  user:null,
  appUser:null,
  appUserId:null,
  profile:null,

  gifts:[],
  giftCounts:{},
  itemCounts:{},

  customProjects:[],
  customItems:{},
  activeCustomProjectId:null,

  eventSettings:{},
  eventGiftSettings:{},
  includeSeasonGiftsInEndurance:true,
  giftTargets:{},
  giftViewMode:'all',

  entryCount:0,
  entryGoal:100,
  entryRules:[],
  entryOpenSection:'coin',

  themeMode:'light',
  accentColor:'#e98f8f',

  loading:true
};

const $=s=>document.querySelector(s);

const esc=s=>String(s??'').replace(
  /[&<>"']/g,
  m=>({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[m])
);

function toast(t){
  const e=$('#toast');

  if(!e){
    console.log(t);
    return;
  }

  e.textContent=t;
  e.classList.add('show');

  setTimeout(
    ()=>e.classList.remove('show'),
    2200
  );
}

function applyTheme(){
  const root=document.documentElement;
  const accent=state.accentColor||'#e98f8f';
  const hex=String(accent).replace('#','');
  const full=hex.length===3?hex.split('').map(x=>x+x).join(''):hex;
  const n=parseInt(full,16);
  const rgb={r:(n>>16)&255,g:(n>>8)&255,b:n&255};
  const mix=(target,amount)=>'#'+['r','g','b'].map(k=>Math.round(rgb[k]+(target-rgb[k])*amount).toString(16).padStart(2,'0')).join('');
  const soft=mix(255,.90);
  const line=mix(255,.68);
  const pale=mix(255,.48);
  const ink=mix(0,.32);
  const shadow=`rgba(${rgb.r},${rgb.g},${rgb.b},.18)`;

  root.dataset.theme=state.themeMode||'light';
  root.style.setProperty('--primary',accent);
  root.style.setProperty('--primary2',pale);
  root.style.setProperty('--accent-soft',soft);
  root.style.setProperty('--soft',soft);
  root.style.setProperty('--line',line);
  root.style.setProperty('--accent-line',line);
  root.style.setProperty('--accent-ink',ink);
  root.style.setProperty('--accent-shadow',shadow);
}

function customItemKey(projectId,itemId){
  return `${projectId}:${itemId}`;
}

async function loadCustomItems(){
  state.customItems={};

  if(
    !sb ||
    !state.appUserId ||
    !state.customProjects.length
  ){
    return;
  }

  const projectIds=
    state.customProjects.map(p=>p.id);

  const {
    data,
    error
  }=await sb
    .from('custom_items')
    .select('*')
    .eq('user_id',state.appUserId)
    .in('project_id',projectIds)
    .order('sort_order')
    .order('created_at');

  if(error){
    console.error(
      'カスタム項目読み込みエラー:',
      error
    );
    return;
  }

  (data||[]).forEach(item=>{
    state.customItems[
      customItemKey(
        item.project_id,
        item.id
      )
    ]=item;
  });
}

async function ensureOfficialGifts(userId){
  const all=[
    ...OFFICIAL_GIFTS.map((g,i)=>({
      ...g, source:'official', event_key:null, sort_order:i
    })),
    ...Object.entries(EVENT_GIFTS).flatMap(([event,gs])=>
      gs.map((g,i)=>({
        ...g, source:'event', event_key:event, sort_order:i
      }))
    ),
    ...SEASON_GIFTS.map((g,i)=>({
      ...g, source:'season', event_key:null, sort_order:i
    }))
  ].map(g=>({
    user_id:userId,
    name:g.name,
    coin:g.coin,
    emoji:'🎁',
    target:10,
    sort_order:g.sort_order,
    source:g.source,
    event_key:g.event_key,
    group_name:g.group||null,
    mascot:g.mascot||null,
    variant:g.variant||null
  }));

 
  const {data:existingAll,error:existingError}=await sb
    .from('gift_definitions')
    .select('id,name,coin,source,event_key')
    .eq('user_id',userId);

  if(existingError)throw existingError;

  // 既存データに残っている旧ギフト名「ガイコツ」を「死神」に移行する。
  // gift_definitions の同じ行を更新するため、既存のカウント紐付けは維持される。
  const {error:renameShinigamiError}=await sb
    .from('gift_definitions')
    .update({name:'死神'})
    .eq('user_id',userId)
    .eq('source','event')
    .eq('event_key','ハロウィンナイト')
    .eq('name','ガイコツ');

  if(renameShinigamiError)throw renameShinigamiError;

  // 通常・イベント・シーズンギフトの重複定義を整理する。
  // イベントは「イベント名 + ギフト名 + コイン数」が同じものだけを重複とみなす。
  // 同名ギフトが別イベントにある場合は、それぞれ別のギフトとして残す。
  const managedRows=(existingAll||[]).filter(
    g=>['official','event','season'].includes(g.source)
  );

  const groups=new Map();

  for(const g of managedRows){
    const key=`${g.source}|${g.event_key||''}|${g.name}|${g.coin}`;
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(g);
  }

  const duplicateIds=[];

  for(const rows of groups.values()){
    if(rows.length<=1)continue;

    const keep=rows[0];
    const ids=rows.slice(1).map(x=>x.id);

    const {data:counts,error:countError}=await sb
      .from('gift_counts')
      .select('gift_id,count')
      .eq('user_id',state.appUserId)
      .in('gift_id',[keep.id,...ids]);

    if(countError)throw countError;

    const total=(counts||[]).reduce(
      (sum,x)=>sum+Number(x.count||0),0
    );

    if(total>0){
      const {error}=await sb.from('gift_counts').upsert({
        user_id:state.appUserId,
        gift_id:keep.id,
        count:total,
        updated_at:new Date().toISOString()
      },{onConflict:'user_id,gift_id'});

      if(error)throw error;
    }

    if(ids.length){
      const {error}=await sb.from('gift_counts').delete()
        .eq('user_id',state.appUserId)
        .in('gift_id',ids);

      if(error)throw error;

      duplicateIds.push(...ids);
    }
  }

  if(duplicateIds.length){
    const {error}=await sb.from('gift_definitions').delete()
      .eq('user_id',userId)
      .in('id',duplicateIds);

    if(error)throw error;
  }

  // 既存ギフトを再取得
  const {data:existing,error:reloadError}=await sb
    .from('gift_definitions')
    .select('id,name,coin,source,event_key')
    .eq('user_id',userId);

  if(reloadError)throw reloadError;

  const keySet=new Set((existing||[]).map(g=>
    `${g.source||'original'}|${g.event_key||''}|${g.name}|${g.coin}`
  ));

  // 未登録のギフトだけ追加
  const missing=all.filter(g=>!keySet.has(
    `${g.source}|${g.event_key||''}|${g.name}|${g.coin}`
  ));

  if(missing.length){
    const {error}=await sb.from('gift_definitions').insert(missing);
    if(error)throw error;
  }

  // 公式ギフトの分類を更新する
  const {data:officialRows,error:officialError}=await sb
    .from('gift_definitions')
    .select('id,name,coin,group_name,mascot,variant')
    .eq('user_id',userId)
    .eq('source','official');

  if(officialError)throw officialError;

  const officialMap=new Map(
    OFFICIAL_GIFTS.map(g=>[
      `${g.name}|${g.coin}`,
      g
    ])
  );

  for(const row of officialRows||[]){
    const definition=officialMap.get(
      `${row.name}|${row.coin}`
    );

    if(!definition)continue;

    const newGroup=definition.group||null;
    const newMascot=definition.mascot||null;
    const newVariant=definition.variant||null;

    if(
      row.group_name===newGroup&&
      row.mascot===newMascot&&
      row.variant===newVariant
    )continue;

    const {error}=await sb
      .from('gift_definitions')
      .update({
        group_name:newGroup,
        mascot:newMascot,
        variant:newVariant
      })
      .eq('id',row.id)
      .eq('user_id',userId);

    if(error)throw error;
  }
}


let loadPromise=null;

async function load(){
  if(loadPromise){
    return loadPromise;
  }

  loadPromise=(async()=>{

  state.loading=true;
  render();

  if(!sb){
    state.loading=false;
    render();
    return;
  }

  const {
    data:{user}
  }=await sb.auth.getUser();

  state.user=user;

  if(user){
    const {
      data:appUser,
      error:appUserError
    }=await sb.rpc(
      'get_or_create_app_user'
    );

    if(appUserError){
      console.error(appUserError);
      toast(appUserError.message);
      state.loading=false;
      render();
      return;
    }

    state.appUser=appUser;
    state.appUserId=appUser.id;

    const {
      data:existingProfile,
      error:profileCheckError
    }=await sb
      .from('profiles')
      .select('*')
      .eq('id',state.user.id)
      .maybeSingle();

    if(profileCheckError){
      console.error(profileCheckError);
    }

    if(!existingProfile){
      const {
        error:profileInsertError
      }=await sb
        .from('profiles')
        .insert({
          id:state.user.id,
          display_name:'Avvyユーザー',
          theme_mode:'light',
          accent_color:'#e98f8f',
          updated_at:new Date().toISOString()
        });

      if(profileInsertError){
        console.error(profileInsertError);
      }
    }

    try{
      await ensureOfficialGifts(
        state.appUserId
      );
    }catch(giftSetupError){
      console.error(
        '公式ギフト初期化エラー:',
        giftSetupError
      );
      state.loading=false;
      render();
      toast(
        '公式ギフトの準備に失敗しました。時間をおいて再読み込みしてください。'
      );
      return;
    }

    const [
      pr,
      gd,
      gc,
      ic,
      cp,
      es,
      egs,
      gts
    ]=await Promise.all([
      sb
        .from('profiles')
        .select('*')
        .eq('id',state.user.id)
        .maybeSingle(),

      sb
        .from('gift_definitions')
        .select('*')
        .eq('user_id',state.appUserId)
        .order('coin')
        .order('source')
        .order('sort_order'),

      sb
        .from('gift_counts')
        .select('*')
        .eq('user_id',state.appUserId),

      sb
        .from('endurance_item_counts')
        .select('*')
        .eq('user_id',state.appUserId),

      sb
        .from('endurance_projects')
        .select('*')
        .eq('user_id',state.appUserId)
        .in('type',['custom','custom_types'])
        .order(
          'created_at',
          {ascending:false}
        ),

      sb
        .from('gift_event_settings')
        .select('*')
        .eq('user_id',state.user.id),

      sb
        .from('gift_event_gift_settings')
        .select('*')
        .eq('user_id',state.appUserId),

      sb
        .from('gift_targets')
        .select('*')
        .eq('user_id',state.appUserId)
    ]);

    // 入室耐久設定（専用テーブルが未作成の場合は初期値のまま起動）
    try{
      const {data:entryData,error:entryError}=await sb
        .from('entry_endurance_settings')
        .select('entry_count,entry_goal,rules')
        .eq('user_id',state.appUserId)
        .maybeSingle();
      if(entryError)throw entryError;
      if(entryData){
        state.entryCount=Number(entryData.entry_count)||0;
        state.entryGoal=Math.max(1,Number(entryData.entry_goal)||100);
        state.entryRules=Array.isArray(entryData.rules)?entryData.rules:[];
      }
    }catch(entryLoadError){
      console.warn('入室耐久設定を読み込めませんでした。SQL設定を確認してください。',entryLoadError);
    }

    state.profile=pr.data||null;
    state.includeSeasonGiftsInEndurance =
      pr.data?.include_season_gifts_in_endurance !== false;

    const officialGiftKeys=new Set(OFFICIAL_GIFTS.map(g=>`${g.name}|${Number(g.coin)}`));
    state.gifts=(gd.data||[]).filter(g=>
      g.source!=='official'||officialGiftKeys.has(`${g.name}|${Number(g.coin)}`)
    );

    state.giftCounts=
      Object.fromEntries(
        (gc.data||[]).map(
          x=>[x.gift_id,x.count]
        )
      );

    state.itemCounts=
      Object.fromEntries(
        (ic.data||[]).map(
          x=>[
            x.category+':'+x.item_key,
            x.count
          ]
        )
      );

    state.customProjects=cp.data||[];

    await loadCustomItems();

    state.eventSettings=
      Object.fromEntries(
        (es.data||[]).map(
          x=>[x.event_key,x.enabled]
        )
      );

    state.eventGiftSettings=
      Object.fromEntries(
        (egs.data||[]).map(
          x=>[x.gift_id,x.enabled]
        )
      );

    state.giftTargets=
      Object.fromEntries(
        (gts.data||[]).map(
          x=>[
            `${x.source}|${x.event_key||''}|${Number(x.coin)}`,
            Number(x.target)||50
          ]
        )
      );

    state.themeMode=
      state.profile?.theme_mode||'light';

    state.accentColor=
      state.profile?.accent_color||'#e98f8f';

    applyTheme();

  }else{
    state.appUser=null;
    state.appUserId=null;
    state.profile=null;
    state.gifts=[];
    state.giftCounts={};
    state.itemCounts={};
    state.customProjects=[];
    state.customItems={};
    state.activeCustomProjectId=null;
    state.eventSettings={};
    state.eventGiftSettings={};
    state.giftTargets={};
  }

  state.loading=false;
  render();
  })();

  try{
    return await loadPromise;
  }finally{
    loadPromise=null;
  }
}

async function signUp(
  email,
  password,
  name
){
  const {
    data,
    error
  }=await sb.auth.signUp({
    email,
    password,
    options:{
      data:{
        display_name:name
      }
    }
  });

  if(error)throw error;

  toast(
    data.session
      ? '登録しました'
      : '登録しました。確認メールを確認してください'
  );

  await load();
}

async function signIn(
  email,
  password
){
  const {error}=await sb.auth.signInWithPassword({
    email,
    password
  });

  if(error)throw error;

  toast('ログインしました');

  await load();
}

async function startNewUser(){
  try{
    if(!sb){
      throw new Error(
        'Supabaseが設定されていません'
      );
    }

    const {
      data,
      error
    }=await sb.auth.signInAnonymously();

    if(error)throw error;

    if(!data?.user){
      throw new Error(
        '匿名ログインに失敗しました'
      );
    }

    await load();

    if(!state.appUser?.user_code){
      throw new Error(
        'ユーザーコードの取得に失敗しました'
      );
    }

    alert(
      '新しくはじめました！\n\n'+
      'あなたのユーザーコード：\n'+
      state.appUser.user_code+
      '\n\nこのコードはデータ引き継ぎに必要なので、大切に保管してください。'
    );

  }catch(e){
    console.error(
      '新しくはじめるエラー:',
      e
    );

    alert(
      '処理に失敗しました。\n\n'+
      'エラー内容：\n'+
      (e?.message||String(e))
    );
  }
}

async function takeoverUser(){
  if(!sb){
    alert(
      'Supabaseの設定がありません。'
    );
    return;
  }

  const input=prompt(
    '引き継ぎたいユーザーコードを入力してください。\n\n'+
    '例：AVVY-XXXX-XXXX'
  );

  if(input===null)return;

  const code=input
    .trim()
    .toUpperCase();

  if(!code){
    alert(
      'ユーザーコードを入力してください。'
    );
    return;
  }

  try{
    const {
      data:sessionData
    }=await sb.auth.getSession();

    if(!sessionData?.session){
      const {
        data,
        error
      }=await sb.auth.signInAnonymously();

      if(error)throw error;

      if(!data?.user){
        throw new Error(
          '匿名ユーザーの作成に失敗しました。'
        );
      }
    }

    const {
      data,
      error
    }=await sb.rpc(
      'link_app_user_by_code',
      {
        input_code:code
      }
    );

    if(error)throw error;

    if(!data){
      throw new Error(
        'ユーザーコードの引き継ぎに失敗しました。'
      );
    }

    await load();

    alert(
      'データを引き継ぎました！'
    );

  }catch(error){
    console.error(error);

    alert(
      'データの引き継ぎに失敗しました。\n'+
      (error.message||error)
    );
  }
}

async function signOut(){
  if(!sb)return;

  await sb.auth.signOut();

  state.user=null;
  state.appUser=null;
  state.appUserId=null;
  state.profile=null;
  state.gifts=[];
  state.giftCounts={};
  state.itemCounts={};
  state.customProjects=[];
  state.customItems={};
  state.activeCustomProjectId=null;
  state.eventSettings={};
  state.eventGiftSettings={};
  state.giftTargets={};
  state.loading=false;

  render();
}

function header(){
  const displayName=
    state.profile?.display_name||
    'Avvyユーザー';

  return `
    <header class="top">
      <div class="top-inner">

        <div class="brand">
          ✦ Avvy配信補助ツール
        </div>

        <div class="userbox">
          ${
            state.user
              ? `
                <span class="user-name">
                  👤 ${esc(displayName)}
                </span>

                <div class="quick-actions">
                  <button
                    class="iconbtn quick-reload"
                    id="quickReloadBtn"
                    type="button"
                    title="アプリを再読み込み"
                    aria-label="アプリを再読み込み"
                  >
                    ↻
                  </button>
                  <button
                    class="iconbtn"
                    id="quickSettings"
                    type="button"
                    title="見た目の設定"
                    aria-label="見た目の設定"
                  >
                    ⚙️
                  </button>
                </div>
              `
              :''
          }
        </div>

      </div>

      <nav class="tabs">
        ${
          TABS.map(
            ([id,ic,n])=>`
              <button
                data-tab="${id}"
                class="${state.tab===id?'active':''}"
              >
                <span class="tab-icon" aria-hidden="true">${ic}</span>
                <span class="tab-label">${n}</span>
              </button>
            `
          ).join('')
        }
      </nav>
    </header>
  `;
}

function auth(){
  return `
    <section
      class="auth card"
      style="text-align:center;"
    >
      <h2 style="color:var(--text,#222);">
        ☁️ Avvyをはじめる
      </h2>

      <p
        class="muted"
        style="color:var(--muted,#666);"
      >
        データはクラウドに保存されます。
      </p>

      <div
        class="auth-actions"
        style="
          display:flex;
          flex-direction:column;
          gap:12px;
          margin-top:20px;
        "
      >
        <button
          class="primary"
          id="startNewUser"
          style="font-size:16px;"
        >
          ✨ 新しくはじめる
        </button>

        <button
          class="secondary"
          id="takeoverUser"
          style="font-size:16px;"
        >
          ☁️ データを引き継ぐ
        </button>
      </div>
    </section>
  `;
}

function home(){
  const total=
    Object.values(state.giftCounts)
      .reduce(
        (a,b)=>a+Number(b||0),
        0
      );

  const selected=
    Object.values(state.itemCounts)
      .reduce(
        (a,b)=>a+Number(b||0),
        0
      );

  const customTotal=
    Object.entries(state.itemCounts||{})
      .filter(
        ([key])=>key.startsWith('custom:')
      )
      .reduce(
        (sum,[,value])=>
          sum+Number(value||0),
        0
      );

  return `
    <div class="hero">
      <h1>
        耐久配信のカウントを、かんたんに。
      </h1>

      <p>
        ギフトや各種企画をタップするだけで記録できます。
      </p>
    </div>


<div class="grid home-feature-grid">

  <button type="button" class="card home-feature-card" data-jump="gift">
    <h3>🎁 ギフト</h3>
    <p class="muted">ギフト耐久を記録</p>
    <span class="primary">ギフトを開く →</span>
  </button>

  <button type="button" class="card home-feature-card" data-jump="entry">
    <h3>🚪 入室耐久</h3>
    <p class="muted">入室カウントを記録</p>
    <span class="primary">入室耐久を開く →</span>
  </button>

  <button type="button" class="card home-feature-card" data-jump="pref">
    <h3>📍 都道府県</h3>
    <p class="muted">都道府県の耐久を記録</p>
    <span class="primary">都道府県を開く →</span>
  </button>

  <button type="button" class="card home-feature-card" data-jump="mbti">
    <h3>🧠 MBTI</h3>
    <p class="muted">MBTIの耐久を記録</p>
    <span class="primary">MBTIを開く →</span>
  </button>

  <button type="button" class="card home-feature-card" data-jump="zodiac">
    <h3>⭐ 星座</h3>
    <p class="muted">星座の耐久を記録</p>
    <span class="primary">星座を開く →</span>
  </button>

  <button type="button" class="card home-feature-card" data-jump="origift">
    <h3>🎨 オリギフ</h3>
    <p class="muted">オリジナルギフトを記録</p>
    <span class="primary">オリギフを開く →</span>
  </button>

  <button type="button" class="card home-feature-card home-feature-wide" data-jump="custom">
    <h3>✨ カスタム</h3>
    <p class="muted">自分だけの耐久を記録</p>
    <span class="primary">カスタムを開く →</span>
  </button>

</div>

    </div>
  `;
}

function gift(){
  const official=
    state.gifts.filter(
      g=>g.source==='official'
    );

  const coins=[
    ...new Set(
      official.map(
        g=>Number(g.coin)
      )
    )
  ].sort(
    (a,b)=>a-b
  );

  const events=[
    ...new Set(
      state.gifts
        .filter(
          g=>
            g.source==='event'&&
            state.eventSettings[g.event_key]
        )
        .map(g=>g.event_key)
    )
  ];

  const selectedEventGifts=
    state.gifts.filter(
      g=>
        g.source==='event'&&
        state.eventSettings[g.event_key]&&
        state.eventGiftSettings[g.id]!==false
    );

  const seasonGifts=state.gifts.filter(g=>g.source==='season');

  const allSelected=[
    ...official,
    ...selectedEventGifts,
    ...(state.includeSeasonGiftsInEndurance ? seasonGifts : [])
  ];

  const overall=
    giftTypeSummary(allSelected);

  if(state.giftViewMode==='collect'){
    return giftCollectionPage();
  }
  if(state.giftViewMode==='mini'){
    return miniGiftPage();
  }

  return `
    <div class="card gift-ui gift-endurance">

      <div class="section-head">
        <div>
          <h2>🎁 全ギフ耐久</h2>
          <p class="top-note">
            1回でも受け取ったギフトは達成済みになります。
          </p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="secondary gift-switch" id="showMiniGifts">ミニギフのみ →</button>
          <button class="secondary gift-switch" id="showGiftCollection">ギフト集めへ →</button>
          <button class="secondary" id="eventSettings">イベント設定</button>
        </div>
      </div>

      ${summaryHtml(
        overall,
        true,
        '全ギフ耐久'
      )}

      <div class="season-gift-setting">
        <div class="season-gift-copy">
          <strong>シーズンギフトを全ギフ耐久に含める</strong>
          <p class="top-note">ONにすると期間限定ギフトも全ギフ耐久の達成数に加算します。</p>
        </div>
        <button class="${state.includeSeasonGiftsInEndurance?'primary':'secondary'} season-gift-toggle" id="toggleSeasonGiftEndurance" aria-pressed="${state.includeSeasonGiftsInEndurance}">
          ${state.includeSeasonGiftsInEndurance?'ON':'OFF'}
        </button>
      </div>

      <div class="row" style="margin:10px 0 14px;justify-content:flex-end">
        <button class="danger" id="resetAllGifts">
          全ギフ耐久を一括リセット
        </button>
      </div>

      ${coins.map(
        c=>giftOfficialGroup(c)
      ).join('')}

      ${
        events.length
          ? events.map(
              e=>giftEventGroup(e)
            ).join('')
          : `
            <div class="empty">
              イベント限定ギフトは現在OFFです。
              「イベント設定」から追加できます。
            </div>
          `
      }

      ${giftSeasonGroup()}

    </div>
  `;
}

function miniGiftPage(){
  const gifts=state.gifts.filter(g=>g.source==='official' && Number(g.coin)===5);
  const summary=giftTypeSummary(gifts);
  return `<div class="card gift-ui gift-endurance mini-gift-page">
    <div class="section-head"><div><h2>🎀 ミニギフのみ耐久</h2><p class="top-note">5コインの通常ギフトだけを表示しています。</p></div><div class="gift-page-switches"><button class="secondary gift-switch" id="showGiftCollection">ギフト集めへ →</button><button class="secondary gift-switch" id="showAllGiftEndurance">← 全ギフ耐久へ</button></div></div>
    ${summaryHtml(summary,true,'ミニギフ耐久')}
    <div class="mini-gift-grid-wrap">${giftButtons(gifts)}</div>
  </div>`;
}

function collectionStorageKey(){
  return `avvyGiftCollection:${state.appUserId||'local'}`;
}
function getGiftCollectionGoals(){
  try{return JSON.parse(localStorage.getItem(collectionStorageKey())||'[]')}catch(e){return []}
}
function saveGiftCollectionGoals(goals){
  localStorage.setItem(collectionStorageKey(),JSON.stringify(goals));
}
function giftCollectionPage(){
  const goals=getGiftCollectionGoals();
  const enabled=state.gifts.filter(g=>g.source!=='origift');
  const mascotNames=[...new Set(enabled.map(g=>g.mascot).filter(Boolean))];
  const rows=goals.map((goal,index)=>{
    let goalGifts=[];
    if(goal.type==='mascot'){
      goalGifts=enabled.filter(g=>g.mascot===goal.mascot);
    }else if(goal.type==='multi'){
      goalGifts=(goal.giftIds||[]).map(id=>enabled.find(g=>String(g.id)===String(id))).filter(Boolean);
    }else{
      const g=enabled.find(x=>String(x.id)===String(goal.giftId));
      if(g)goalGifts=[g];
    }
    const current=goalGifts.reduce((sum,g)=>sum+Number(state.giftCounts[g.id]||0),0);
    const target=Math.max(1,Number(goal.target)||1);
    const pct=Math.min(100,current/target*100);
    const giftRows=goalGifts.map(g=>{
      const count=Number(state.giftCounts[g.id]||0);
      return `<div class="row" style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 0;border-top:1px solid var(--line,#eee)">
        <div style="min-width:0;flex:1"><strong>${esc(g.name)}</strong><div class="top-note">${Number(g.coin)||0}C · ${count} 個</div></div>
        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0"><button type="button" class="secondary small-btn" data-collection-minus="${esc(g.id)}" aria-label="${esc(g.name)}を1個減らす" ${count<=0?'disabled':''}>−1</button><button type="button" class="primary small-btn" data-collection-plus="${esc(g.id)}" aria-label="${esc(g.name)}を1個増やす">＋1</button></div>
      </div>`;
    }).join('');
    return `<div class="card collection-goal" style="margin:10px 0;padding:14px">
      <div class="section-head"><div><strong>${esc(goal.label)}</strong><p class="top-note">${goal.type==='mascot'?'該当ケモずのギフトを種類問わず合算':goal.type==='multi'?'選択したギフトの合計':'指定ギフトのみ'}</p></div><button class="danger small-btn" data-remove-collection-goal="${index}">削除</button></div>
      <div style="display:flex;justify-content:space-between;gap:8px;margin:10px 0"><strong>${current} / ${target} 個</strong><span class="pill">${current>=target?'達成！':`${Math.round(pct)}%`}</span></div>
      <div style="height:8px;background:var(--line,#eee);border-radius:99px;overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--accent,#e98f8f);border-radius:99px"></div></div>
      <div style="margin-top:10px">${giftRows||'<p class="top-note">対象ギフトがありません。</p>'}</div>
    </div>`;
  }).join('');
  const giftOptions=enabled.map(g=>`<option value="${esc(g.id)}">${esc(g.name)}（${Number(g.coin)}C）</option>`).join('');
  const mascotOptions=mascotNames.map(m=>`<option value="${esc(m)}">${esc(m)}</option>`).join('');
  return `<div class="card gift-ui gift-collection">
    <div class="section-head"><div><h2>🎯 ギフト集め</h2><p class="top-note">特定ギフト・複数ギフト・ケモず単位で目標を設定できます。</p></div></div>
    <div class="gift-collection-navigation"><button type="button" class="secondary gift-switch" id="showMiniGifts">🎀 ミニギフのみへ</button><button type="button" class="secondary gift-switch" id="showAllGiftEndurance">← 全ギフ耐久へ</button></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0"><button class="primary" id="addGiftCollectionGoal">＋ 目標を追加</button><button class="secondary" id="resetGiftCollectionGoals">目標をすべて削除</button></div>
    ${rows||'<div class="empty">まだ目標がありません。「目標を追加」から設定できます。</div>'}
    <p class="top-note" style="margin-top:12px">目標設定はこのブラウザに保存されます。受け取り数は既存のギフトカウントを利用します。</p>
  </div>`;
}
function addGiftCollectionGoal(){
  const gifts=state.gifts.filter(g=>g.source!=='origift');
  if(!gifts.length){toast('ギフトデータがありません');return;}
  const m=modal(`<div class="section-head"><h2>🎯 集める目標を追加</h2><button class="iconbtn" id="closeCollectionModal">×</button></div>
    <div class="form"><label>集め方</label><select id="collectionType"><option value="gift">特定のギフト</option><option value="multi">複数のギフトを合算</option><option value="mascot">ケモずを集める（種類問わず合算）</option></select>
    <div id="collectionGiftFields"><label for="collectionGiftSearch">ギフトを検索</label><input id="collectionGiftSearch" type="search" placeholder="ギフト名で検索"><label>ギフト</label><select id="collectionGift">${gifts.map(g=>`<option value="${esc(g.id)}">${esc(g.name)}（${Number(g.coin)}C）</option>`).join('')}</select></div>
    <div id="collectionMultiFields" style="display:none"><label for="collectionGiftsSearch">ギフトを検索</label><input id="collectionGiftsSearch" type="search" placeholder="ギフト名で検索"><label>集めるギフト（複数選択可）</label><select id="collectionGifts" multiple size="8">${gifts.map(g=>`<option value="${esc(g.id)}">${esc(g.name)}（${Number(g.coin)}C）</option>`).join('')}</select><p class="top-note">Ctrlキー（MacはCommandキー）を押しながら複数選択できます。</p></div>
    <div id="collectionMascotFields" style="display:none"><label>ケモず</label><select id="collectionMascot">${[...new Set(gifts.map(g=>g.mascot).filter(Boolean))].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></div>
    <label>目標個数</label><input id="collectionTarget" type="number" min="1" value="10"><button class="primary" id="saveCollectionGoal">目標を追加</button></div>`);
  const type=m.querySelector('#collectionType');
  const filterGiftOptions=(inputId,selectId)=>{
    const input=m.querySelector('#'+inputId), select=m.querySelector('#'+selectId);
    input?.addEventListener('input',()=>{
      const query=input.value.trim().toLocaleLowerCase();
      [...select.options].forEach(option=>{
        const matches=option.textContent.toLocaleLowerCase().includes(query);
        option.hidden=!matches;
      });
    });
  };
  filterGiftOptions('collectionGiftSearch','collectionGift');
  filterGiftOptions('collectionGiftsSearch','collectionGifts');
  const update=()=>{const v=type.value;m.querySelector('#collectionGiftFields').style.display=v==='gift'?'':'none';m.querySelector('#collectionMultiFields').style.display=v==='multi'?'':'none';m.querySelector('#collectionMascotFields').style.display=v==='mascot'?'':'none';};
  type.addEventListener('change',update);
  m.querySelector('#closeCollectionModal').onclick=()=>m.remove();
  m.querySelector('#saveCollectionGoal').onclick=()=>{
    const v=type.value;const target=Math.max(1,Number(m.querySelector('#collectionTarget').value)||1);let goal;
    if(v==='gift'){const id=m.querySelector('#collectionGift').value;const g=gifts.find(x=>x.id===id);goal={type:'gift',giftId:id,label:g?.name||'ギフト',target};}
    else if(v==='multi'){const ids=[...m.querySelector('#collectionGifts').selectedOptions].map(o=>o.value);if(!ids.length){toast('ギフトを1つ以上選んでください');return;}goal={type:'multi',giftIds:ids,label:ids.map(id=>gifts.find(g=>g.id===id)?.name).filter(Boolean).join('＋'),target};}
    else{const mascot=m.querySelector('#collectionMascot').value;goal={type:'mascot',mascot,label:`${mascot}集め`,target};}
    const goals=getGiftCollectionGoals();goals.push(goal);saveGiftCollectionGoals(goals);m.remove();render();
  };
}

function giftSeasonGroup(){
  const gs=state.gifts.filter(g=>g.source==='season');
  if(!gs.length)return '';
  return `
    <div class="event-group">
      <div class="coin-head">
        <div>
          <div class="coin-title">🎃 シーズンギフト</div>
          <p class="top-note">イベント設定とは別枠の期間限定ギフト</p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <button type="button" class="danger" data-reset-gift="${gs[0].id}">リセット</button>
          <span class="pill">10月限定</span>
        </div>
      </div>
      ${summaryHtml(giftTypeSummary(gs))}
      ${giftButtons(gs)}
    </div>
  `;
}

function giftTypeSummary(gs){
  const total=gs.length;

  const achieved=
    gs.filter(
      g=>Number(
        state.giftCounts[g.id]||0
      )>0
    ).length;

  const remaining=
    Math.max(
      0,
      total-achieved
    );

  const pct=
    total
      ? Math.min(
          100,
          achieved/total*100
        )
      : 0;

  return {
    achieved,
    total,
    remaining,
    pct
  };
}

function summaryHtml(
  summary,
  isOverall=false,
  label=''
){
  if(isOverall){
    const pct=Math.max(0,Math.min(100,Number(summary.pct)||0));
    return `
      <div class="target-summary overall-target-summary">
        <div class="overall-progress-ring" style="--progress:${pct}%">
          <div class="overall-progress-inner">
            <strong>${Math.round(pct)}<span>%</span></strong>
          </div>
        </div>
        <div class="overall-progress-details">
          ${label ? `<div class="summary-label">${esc(label)}</div>` : ''}
          <strong class="overall-count">${summary.achieved} / ${summary.total}種類</strong>
          <span class="overall-remaining">残り ${summary.remaining}種類</span>
          ${summary.total && summary.achieved===summary.total ? `<div class="complete-badge">🎉 全ギフト達成！</div>` : ''}
        </div>
      </div>
    `;
  }

  return `
    <div class="target-summary">
      <div class="target-main">
        <strong>${summary.achieved} / ${summary.total}種類</strong>
        <span>残り ${summary.remaining}種類</span>
      </div>
      ${label ? `<div class="summary-label">${esc(label)}</div>` : ''}
      <div class="progress"><i style="width:${summary.pct}%"></i></div>
      ${summary.total && summary.achieved===summary.total ? `<div class="complete-badge">🎉 全ギフト達成！</div>` : ''}
    </div>
  `;
}

function giftOfficialGroup(coin){
  const gs=
    state.gifts.filter(
      g=>
        g.source==='official'&&
        Number(g.coin)===coin
    );

  const summary=
    giftTypeSummary(gs);

 if(coin===5){
  const groups=[
    '文字系',
    'アイテム系',
    'Avvyケモず系'
  ];

    return `
      <div class="coin-group">

        <div class="coin-head">
          <div>
            <div class="coin-title">
              5C
            </div>
          </div>

          <div class="row">
            <button
              class="danger"
              data-reset-source="official"
              data-reset-coin="${coin}"
            >
              リセット
            </button>
          </div>
        </div>

        ${summaryHtml(summary)}

        ${
          groups.map(
            group=>`
              <div class="gift-category">

                <h4>
                  ${group}
                </h4>

                ${
                  group==='Avvyケモず系'
                    ? mascotGroups(gs)
                    : giftButtons(
                        gs.filter(
                          g=>g.group_name===group && !(group==='文字系' && /^乙(?:[（(]げるくま[）)])?$/.test(String(g.name||'')))
                        )
                      )
                }

              </div>
            `
          ).join('')
        }

      </div>
    `;
  }

  return `
    <div class="coin-group">

      <div class="coin-head">

        <div>
          <div class="coin-title">
            ${coin}C
          </div>
        </div>

        <div class="row">
          <button
            class="danger"
            data-reset-source="official"
            data-reset-coin="${coin}"
          >
            リセット
          </button>
        </div>

      </div>

      ${summaryHtml(summary)}

      ${giftButtons(gs)}

    </div>
  `;
}

// Bundled gift images. Official gifts work immediately after deployment; users can still override images locally.
const BUNDLED_GIFT_IMAGES = {"normal":{"100本のバラ":"%E9%80%9A%E5%B8%B8/100%E6%9C%AC%E3%81%AE%E3%83%90%E3%83%A9.png","Big Thanks":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/Big%20Thanks.png","ありがとう":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%82%E3%82%8A%E3%81%8C%E3%81%A8%E3%81%86.png","いいね(でんきゅいぬ)":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%84%E3%81%84%E3%81%AD(%E3%81%A7%E3%82%93%E3%81%8D%E3%82%85%E3%81%84%E3%81%AC).png","いいね(ヨルワール)":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%84%E3%81%84%E3%81%AD(%E3%83%A8%E3%83%AB%E3%83%AF%E3%83%BC%E3%83%AB).png","おかえり":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%8A%E3%81%8B%E3%81%88%E3%82%8A.png","おなかすいた":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%8A%E3%81%AA%E3%81%8B%E3%81%99%E3%81%84%E3%81%9F.png","おはよう！":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%8A%E3%81%AF%E3%82%88%E3%81%86%EF%BC%81.png","おやすみ":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%8A%E3%82%84%E3%81%99%E3%81%BF.png","お大事に":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%8A%E5%A4%A7%E4%BA%8B%E3%81%AB.png","かまって":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%8B%E3%81%BE%E3%81%A3%E3%81%A6.png","がんばれ":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%8C%E3%82%93%E3%81%B0%E3%82%8C.png","ごゆっくり":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%94%E3%82%86%E3%81%A3%E3%81%8F%E3%82%8A.png","ごろ寝":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%94%E3%82%8D%E5%AF%9D.png","しょぼぼーん":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%97%E3%82%87%E3%81%BC%E3%81%BC%E3%83%BC%E3%82%93.png","たすかる":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%9F%E3%81%99%E3%81%8B%E3%82%8B.png","ただいま～":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%9F%E3%81%A0%E3%81%84%E3%81%BE%EF%BD%9E.png","たましい":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%9F%E3%81%BE%E3%81%97%E3%81%84.png","またね":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%81%BE%E3%81%9F%E3%81%AD.png","もぐもぐ":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%82%82%E3%81%90%E3%82%82%E3%81%90.png","わかる":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%82%8F%E3%81%8B%E3%82%8B.png","カチコチ":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%82%AB%E3%83%81%E3%82%B3%E3%83%81.png","ショック！":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%82%B7%E3%83%A7%E3%83%83%E3%82%AF%EF%BC%81.png","チルい":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%83%81%E3%83%AB%E3%81%84.png","パチパチ":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%83%91%E3%83%81%E3%83%91%E3%83%81.png","メラメラ":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E3%83%A1%E3%83%A9%E3%83%A1%E3%83%A9.png","乙":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E4%B9%99.png","充電中":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E5%85%85%E9%9B%BB%E4%B8%AD.png","嬉しい！":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E5%AC%89%E3%81%97%E3%81%84%EF%BC%81.png","心配":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E5%BF%83%E9%85%8D.png","推し":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E6%8E%A8%E3%81%97.png","溶けちゃう":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E6%BA%B6%E3%81%91%E3%81%A1%E3%82%83%E3%81%86.png","照れ照れ":"%E9%80%9A%E5%B8%B8/Avvy%E3%82%B1%E3%83%A2%E3%81%9A/%E7%85%A7%E3%82%8C%E7%85%A7%E3%82%8C.png","お茶":"%E9%80%9A%E5%B8%B8/%E3%81%8A%E8%8C%B6.png","アイスクリーム":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%A0.png","おめでとう":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%81%8A%E3%82%81%E3%81%A7%E3%81%A8%E3%81%86.png","つぼみのバラ":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%81%A4%E3%81%BC%E3%81%BF%E3%81%AE%E3%83%90%E3%83%A9.png","クリームソーダ":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%A0%E3%82%BD%E3%83%BC%E3%83%80.png","ハート":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%83%8F%E3%83%BC%E3%83%88.png","バラ":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%83%90%E3%83%A9.png","プレゼントボックス":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%83%97%E3%83%AC%E3%82%BC%E3%83%B3%E3%83%88%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9.png","ペンライト(3本)":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%83%9A%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%88(3%E6%9C%AC).png","ペンライト":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E3%83%9A%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%88.png","花束":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E8%8A%B1%E6%9D%9F.png","音符":"%E9%80%9A%E5%B8%B8/%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0/%E9%9F%B3%E7%AC%A6.png","キラキラ":"%E9%80%9A%E5%B8%B8/%E3%82%AD%E3%83%A9%E3%82%AD%E3%83%A9.png","ケモずファンファーレ":"%E9%80%9A%E5%B8%B8/%E3%82%B1%E3%83%A2%E3%81%9A%E3%83%95%E3%82%A1%E3%83%B3%E3%83%95%E3%82%A1%E3%83%BC%E3%83%AC.png","ドドド":"%E9%80%9A%E5%B8%B8/%E3%83%89%E3%83%89%E3%83%89.png","ハロウィンナイト":"%E9%80%9A%E5%B8%B8/%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%8A%E3%82%A4%E3%83%88.png","ハートラッシュ！":"%E9%80%9A%E5%B8%B8/%E3%83%8F%E3%83%BC%E3%83%88%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%EF%BC%81.png","ハート風船":"%E9%80%9A%E5%B8%B8/%E3%83%8F%E3%83%BC%E3%83%88%E9%A2%A8%E8%88%B9.png","ビックハートクッション":"%E9%80%9A%E5%B8%B8/%E3%83%93%E3%83%83%E3%82%AF%E3%83%8F%E3%83%BC%E3%83%88%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3.png","ペンライト振り":"%E9%80%9A%E5%B8%B8/%E3%83%9A%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%88%E6%8C%AF%E3%82%8A.png","ミニケーキ":"%E9%80%9A%E5%B8%B8/%E3%83%9F%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%AD.png","レインボーステージ":"%E9%80%9A%E5%B8%B8/%E3%83%AC%E3%82%A4%E3%83%B3%E3%83%9C%E3%83%BC%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B8.png","乾杯":"%E9%80%9A%E5%B8%B8/%E4%B9%BE%E6%9D%AF.png","尊い":"%E9%80%9A%E5%B8%B8/%E5%B0%8A%E3%81%84.png","GOD":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/GOD.png","IMG_E3767":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/IMG_E3767.png","NOTOK":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/NOTOK.png","OK":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/OK.png","ww":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/ww.png","うれピーナッツ":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%86%E3%82%8C%E3%83%94%E3%83%BC%E3%83%8A%E3%83%83%E3%83%84.png","うんうん":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%86%E3%82%93%E3%81%86%E3%82%93.png","ええやん":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%88%E3%81%88%E3%82%84%E3%82%93.png","えっ？":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%88%E3%81%A3%EF%BC%9F.png","かわいい(ピンク)":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%8B%E3%82%8F%E3%81%84%E3%81%84(%E3%83%94%E3%83%B3%E3%82%AF).png","かわいい(青)":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%8B%E3%82%8F%E3%81%84%E3%81%84(%E9%9D%92).png","さすが":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%95%E3%81%99%E3%81%8C.png","すやぴっぴ":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%99%E3%82%84%E3%81%B4%E3%81%A3%E3%81%B4.png","たしカニ":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%81%9F%E3%81%97%E3%82%AB%E3%83%8B.png","わかりみ":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E3%82%8F%E3%81%8B%E3%82%8A%E3%81%BF.png","天才かよ":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E5%A4%A9%E6%89%8D%E3%81%8B%E3%82%88.png","最高":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E6%9C%80%E9%AB%98.png","祝":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E7%A5%9D.png","神回":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E7%A5%9E%E5%9B%9E.png","笑":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E7%AC%91.png","草":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%E8%8D%89.png","！？":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%EF%BC%81%EF%BC%9F.png","？":"%E9%80%9A%E5%B8%B8/%E6%96%87%E5%AD%97/%EF%BC%9F.png","花火セレナーデ":"%E9%80%9A%E5%B8%B8/%E8%8A%B1%E7%81%AB%E3%82%BB%E3%83%AC%E3%83%8A%E3%83%BC%E3%83%87.png","集中線":"%E9%80%9A%E5%B8%B8/%E9%9B%86%E4%B8%AD%E7%B7%9A.png"},"event":{"Cool":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/Cool.png","Let's Go！":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/Let's%20Go%EF%BC%81.png","LOL(ネオン)":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/LOL(%E3%83%8D%E3%82%AA%E3%83%B3).png","アイスキャンディー":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%82%A2%E3%82%A4%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%87%E3%82%A3%E3%83%BC.png","エナジードリンク(ネオン)":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%82%A8%E3%83%8A%E3%82%B8%E3%83%BC%E3%83%89%E3%83%AA%E3%83%B3%E3%82%AF(%E3%83%8D%E3%82%AA%E3%83%B3).png","コウモリ":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%82%B3%E3%82%A6%E3%83%A2%E3%83%AA.png","コーラ":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%82%B3%E3%83%BC%E3%83%A9.png","ゴースト":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%82%B4%E3%83%BC%E3%82%B9%E3%83%88.png","ストロベリーシェイク":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%82%B9%E3%83%88%E3%83%AD%E3%83%99%E3%83%AA%E3%83%BC%E3%82%B7%E3%82%A7%E3%82%A4%E3%82%AF.png","ソーダ":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%82%BD%E3%83%BC%E3%83%80.png","チャーハン":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%81%E3%83%A3%E3%83%BC%E3%83%8F%E3%83%B3.png","ドンッ！":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%89%E3%83%B3%E3%83%83%EF%BC%81.png","ハート(ネオン)":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%8F%E3%83%BC%E3%83%88(%E3%83%8D%E3%82%AA%E3%83%B3).png","パンダまん":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%91%E3%83%B3%E3%83%80%E3%81%BE%E3%82%93.png","フライドポテト":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%95%E3%83%A9%E3%82%A4%E3%83%89%E3%83%9D%E3%83%86%E3%83%88.png","フルーツキャンディ":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%95%E3%83%AB%E3%83%BC%E3%83%84%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%87%E3%82%A3.png","フルーツペンライト":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%95%E3%83%AB%E3%83%BC%E3%83%84%E3%83%9A%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%88.png","フルーツポンチ":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%95%E3%83%AB%E3%83%BC%E3%83%84%E3%83%9D%E3%83%B3%E3%83%81.png","ラムネ":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%A9%E3%83%A0%E3%83%8D.png","レコード":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89.png","ロリポップ":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E3%83%AD%E3%83%AA%E3%83%9D%E3%83%83%E3%83%97.png","扇":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E6%89%87.png","死神":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E6%AD%BB%E7%A5%9E.png","福":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E7%A6%8F.png","線香花火":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E7%B7%9A%E9%A6%99%E8%8A%B1%E7%81%AB.png","金魚":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E9%87%91%E9%AD%9A.png","音符(ネオン)":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E9%9F%B3%E7%AC%A6(%E3%83%8D%E3%82%AA%E3%83%B3).png","風車":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E9%A2%A8%E8%BB%8A.png","麻雀牌":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E9%BA%BB%E9%9B%80%E7%89%8C.png","黒猫":"%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/%E9%BB%92%E7%8C%AB.png"}};
function giftDisplayName(g){
  if(g && g.variant==='blue' && g.name==='かわいい') return 'かわいい(青)';
  if(g && g.variant==='pink' && g.name==='かわいい♡') return 'かわいい(ピンク)';
  // Remove character labels in parentheses, but keep quantities/units such as 「ペンライト（3本）」.
  return String(g?.name ?? '')
    .replace(/[（(]([^（）()]*)[）)]/g, (whole, inside) => {
      const value=String(inside).trim();
      if(/^\d+\s*(本|個|枚|回|つ|杯|匹|人|種類|コ|こ|点|セット|連|個入り)$/.test(value)) return whole;
      if(/^\d+\s*(?:c|coin|コイン)$/i.test(value)) return whole;
      return '';
    })
    .replace(/\s+/g,' ')
    .trim();
}
function giftImageSrc(g){
  const displayName=giftDisplayName(g);
  const source=(g && g.source==='event') ? 'event' : 'normal';
  const table=BUNDLED_GIFT_IMAGES[source]||{};
  const rawName=String(g?.name ?? '');
  // Keep exact mascot-specific files first, then fall back to the shared 5c mascot image.
  const aliases={
    'NOT OK':'NOTOK',
    'ハートラッシュ！(クロル)':'ハートラッシュ！',
    'ハートラッシュ(クロル)':'ハートラッシュ！',
    'ビッグハートクッション':'ビックハートクッション'
  };
  const normalize=(value)=>String(value ?? '').normalize('NFKC').trim();
  const candidates=[displayName,rawName,aliases[displayName],aliases[rawName]]
    .filter(Boolean);
  // The app uses full-width 「ｗｗ」 while the image is named 「ww.JPG」.
  candidates.push(...candidates.map(normalize));
  // Some 5c gifts include the mascot name in the app, while the shared image does not.
  // Only remove known mascot suffixes as a fallback; exact character-specific files win first.
  for(const candidate of [...candidates]){
    const baseName=normalize(candidate).replace(/\s*\((?:アヴィエル|でんきゅいぬ|げるくま|ヨルワール|クロル|ウパめろ)\)\s*$/,'');
    if(baseName && baseName!==candidate) candidates.push(baseName);
  }
  // NFKC also handles full-width/half-width variants. Compare keys normalized so case/width variants match.
  for(const candidate of candidates){
    if(Object.prototype.hasOwnProperty.call(table,candidate)) return table[candidate];
    const normalized=normalize(candidate);
    const matchedKey=Object.keys(table).find(key=>normalize(key)===normalized);
    if(matchedKey) return table[matchedKey];
  }
  return '';
}

function mascotGroups(gs){
  const order=[
    'アヴィエル',
    'でんきゅいぬ',
    'げるくま',
    'ヨルワール',
    'クロル',
    'ウパめろ'
  ];

  return order.map(
    m=>`
      <div class="mascot-group">

        <h5>
          ${m}
        </h5>

        ${
          giftButtons(
            gs.filter(
              g=>g.mascot===m && !/^頑張れ(?:[（(]げるくま[）)])?$/.test(String(g.name||''))
            )
          )
        }

      </div>
    `
  ).join('');
}

function giftButtons(gs){
  return `
    <div class="gift-grid">
      ${
        gs.map(
          g=>`
            <div class="gift-card ${Number(state.giftCounts[g.id]||0)>0?'is-achieved':'is-unachieved'}" style="display:flex;flex-direction:column;gap:8px;min-width:0">
              <span class="gift-status">${Number(state.giftCounts[g.id]||0)>0?'達成済み':'未達成'}</span>
              <strong class="gift-title" title="${esc(giftDisplayName(g))}">${esc(g.source==='season' ? `${giftDisplayName(g)}（${Number(g.coin)}c）` : giftDisplayName(g))}</strong>
              ${giftImageSrc(g) ? `<img class="gift-card-image" src="${giftImageSrc(g)}" alt="${esc(giftDisplayName(g))}" loading="lazy" onerror="this.style.display='none'">` : ''}
              <div class="gift-count">${Number(state.giftCounts[g.id]||0)}個</div>
              <div class="gift-counter-controls" role="group" aria-label="${esc(giftDisplayName(g))}のカウント操作">
                <button type="button" class="gift-counter-btn gift-counter-minus" data-gift-minus="${g.id}" ${Number(state.giftCounts[g.id]||0)<=0?'disabled':''} aria-label="${esc(giftDisplayName(g))}を1個減らす"><span aria-hidden="true">−</span><small>1</small></button>
                <button type="button" class="gift-counter-btn gift-counter-plus" data-gift="${g.id}" aria-label="${esc(giftDisplayName(g))}を1個増やす"><span aria-hidden="true">＋</span><small>1</small></button>
              </div>
            </div>
          `
        ).join('')
      }
    </div>
  `;
}

function giftEventGroup(event){
  const gs=
    state.gifts.filter(
      g=>
        g.source==='event'&&
        g.event_key===event&&
        state.eventGiftSettings[g.id]!==false
    );

  const coins=[
    ...new Set(
      gs.map(
        g=>Number(g.coin)
      )
    )
  ].sort(
    (a,b)=>a-b
  );

  const overall=
    giftTypeSummary(gs);

  return `
    <div class="event-group">

      <div class="coin-head">

        <div class="coin-title">
          ${esc(event)}
        </div>

        <button
          class="danger"
          data-reset-event="${esc(event)}"
        >
          リセット
        </button>

      </div>

      ${summaryHtml(
        overall,
        false,
        'イベント内進捗'
      )}

      ${
        coins.map(
          c=>{
            const xs=
              gs.filter(
                g=>Number(g.coin)===c
              );

            const summary=
              giftTypeSummary(xs);

            return `
              <div class="event-coin">

                <div class="coin-head">
                  <h4>${c}C ギフト</h4>
                </div>

                ${summaryHtml(summary)}

                ${giftButtons(xs)}

              </div>
            `;
          }
        ).join('')
      }

    </div>
  `;
}

function eventSettingsModal(){
  const rows=
    EVENT_KEYS.map(
      e=>`
        <div class="item">

          <span>
            <b>${esc(e)}</b>
            <br>
            <small class="muted">
              ${EVENT_GIFTS[e].length}種類
            </small>
          </span>

          <button
            class="${state.eventSettings[e]?'primary':'secondary'}"
            data-event-toggle="${esc(e)}"
          >
            ${state.eventSettings[e]?'ON':'OFF'}
          </button>

        </div>
      `
    ).join('');

  const detail=
    EVENT_KEYS.map(
      e=>`
        <div class="event-setting-box">

          <div class="section-head">
            <b>${esc(e)}</b>
            <span class="pill">
              ${state.eventSettings[e]?'使用中':'未使用'}
            </span>
          </div>

          ${
            EVENT_GIFTS[e].map(
              g=>{
                const def=
                  state.gifts.find(
                    x=>
                      x.source==='event'&&
                      x.event_key===e&&
                      x.name===g.name&&
                      Number(x.coin)===g.coin
                  );

                const on=
                  def
                    ? state.eventGiftSettings[def.id]!==false
                    : false;

                return `
                  <label class="check-row">

                    <input
                      type="checkbox"
                      data-event-gift="${def?.id||''}"
                      ${on?'checked':''}
                      ${state.eventSettings[e]?'':'disabled'}
                    >

                    <span>
                      ${g.coin}C ${esc(g.name)}
                    </span>

                  </label>
                `;
              }
            ).join('')
          }

        </div>
      `
    ).join('');

  const m=modal(`
    <div class="section-head">

      <h2>
        🎪 イベントギフト設定
      </h2>

      <button
        class="iconbtn"
        id="x"
      >
        ×
      </button>

    </div>

    <p class="muted">
      イベント全体のON/OFFと、
      イベント内の個別ギフトを選べます。
    </p>

    <div class="list">
      ${rows}
    </div>

    <div style="margin-top:14px">
      ${detail}
    </div>
  `);

  m.querySelector('#x').onclick=
    ()=>m.remove();

  m.querySelectorAll(
    '[data-event-toggle]'
  ).forEach(
    b=>b.onclick=async()=>{
      const e=
        b.dataset.eventToggle;

      const enabled=
        !state.eventSettings[e];

      const {error}=
        await sb
          .from('gift_event_settings')
          .upsert(
            {
              user_id:state.user.id,
              event_key:e,
              enabled,
              updated_at:new Date().toISOString()
            },
            {
              onConflict:
                'user_id,event_key'
            }
          );

      if(error){
        toast(error.message);
      }else{
        state.eventSettings[e]=enabled;
        eventSettingsModalReplace(m);
      }
    }
  );

  m.querySelectorAll(
    '[data-event-gift]'
  ).forEach(
    ch=>ch.onchange=async()=>{
      if(!ch.dataset.eventGift)return;

      const enabled=ch.checked;

      const {error}=
        await sb
          .from('gift_event_gift_settings')
          .upsert(
            {
              user_id:state.appUserId,
              gift_id:ch.dataset.eventGift,
              enabled,
              updated_at:new Date().toISOString()
            },
            {
              onConflict:
                'user_id,gift_id'
            }
          );

      if(error){
        toast(error.message);
      }else{
        state.eventGiftSettings[
          ch.dataset.eventGift
        ]=enabled;
      }
    }
  );
}

function eventSettingsModalReplace(old){
  old.remove();
  eventSettingsModal();
}

async function editGiftTarget(raw){
  const [
    source,
    eventKey,
    coin
  ]=raw.split('|');

  const key=
    `${source}|${eventKey||''}|${Number(coin)}`;

  const current=
    state.giftTargets[key]||50;

  const input=prompt(
    `${coin}Cの目標個数を入力してください`,
    String(current)
  );

  if(input===null)return;

  const target=
    Math.max(
      1,
      Number(input)||current
    );

  const {error}=
    await sb
      .from('gift_targets')
      .upsert(
        {
          user_id:state.appUserId,
          source,
          event_key:eventKey||null,
          coin:Number(coin),
          target,
          updated_at:new Date().toISOString()
        },
        {
          onConflict:
            'user_id,source,event_key,coin'
        }
      );

  if(error){
    toast(error.message);
  }else{
    state.giftTargets[key]=target;
    render();
    toast(
      '目標個数を更新しました'
    );
  }
}

async function toggleSeasonGiftEndurance(){
  if(!state.user||!state.appUserId){
    toast('ログインしてから設定してください');
    return;
  }
  const nextValue=!state.includeSeasonGiftsInEndurance;
  const {error}=await sb
    .from('profiles')
    .update({
      include_season_gifts_in_endurance:nextValue,
      updated_at:new Date().toISOString()
    })
    .eq('id',state.user.id);
  if(error){
    toast('設定を保存できませんでした。先にSQL設定を実行してください。');
    console.error('シーズンギフト設定保存エラー:',error);
    return;
  }
  state.includeSeasonGiftsInEndurance=nextValue;
  render();
  toast(nextValue?'シーズンギフトを全ギフ耐久に含めます':'シーズンギフトを全ギフ耐久から除外しました');
}

async function resetAllGifts(){
  if(!state.user||!state.appUserId){
    toast('ログインしてから実行してください');
    return;
  }

  const confirmed=confirm(
    '公式ギフト・イベント限定ギフト・シーズンギフト・オリギフを含む、すべてのギフトの達成カウントを0に戻します。イベント設定、シーズンギフトの対象設定、ギフト設定は変更されません。\n\n一括リセットしますか？'
  );
  if(!confirmed)return;

  const {error}=await sb
    .from('gift_counts')
    .delete()
    .eq('user_id',state.appUserId);

  if(error){
    toast('一括リセットに失敗しました：'+error.message);
    return;
  }

  state.giftCounts={};
  render();
  toast('すべてのギフト達成カウントをリセットしました');
}

function resetEvent(event){
  const ids=
    state.gifts
      .filter(
        g=>
          g.source==='event'&&
          g.event_key===event
      )
      .map(g=>g.id);

  if(!ids.length)return;

  sb
    .from('gift_counts')
    .delete()
    .eq('user_id',state.appUserId)
    .in('gift_id',ids)
    .then(
      ({error})=>{
        if(error){
          toast(error.message);
        }else{
          ids.forEach(
            id=>delete state.giftCounts[id]
          );

          render();

          toast(
            'イベントをリセットしました'
          );
        }
      }
    );
}

function choicePage(
  title,
  icon,
  category,
  items
){
  const vals=
    items.map(
      i=>Number(
        state.itemCounts[
          category+':'+i
        ]||0
      )
    );

  const achieved=
    vals.filter(
      count=>count>0
    ).length;

  const total=items.length;

  const remaining=
    Math.max(
      0,
      total-achieved
    );

  const pct=
    total
      ? Math.min(
          100,
          (achieved/total)*100
        )
      : 0;

  return `
    <div class="card">

      <div class="section-head">

        <div>
          <h2>
            ${icon} ${title}
          </h2>

          <p class="top-note">
            項目をタップすると＋1
          </p>
        </div>

        <button
          class="danger"
          data-reset-category="${esc(category)}"
        >
          リセット
        </button>

      </div>

      ${circularProgressSummary({
        pct,
        label:title+'の耐久',
        primary:`${achieved} / ${total}種類`,
        secondary:`残り ${remaining}種類`,
        complete:achieved===total
      })}

      ${
        achieved===total
          ? `
            <div class="complete-badge">
              🎉 全${esc(title)}達成！
            </div>
          `
          :''
      }

      <div
        class="choice-grid"
        style="margin-top:14px"
      >
        ${
          items.map(
            (x,i)=>{
              const count=vals[i];

              return `
                <div class="choice-counter" style="display:flex;align-items:stretch;gap:6px;min-width:0">
                  <button
                    type="button"
                    class="choice-btn ${count>0?'checked':''}"
                    data-item-cat="${esc(category)}"
                    data-item-key="${esc(x)}"
                    style="flex:1;min-width:0"
                  >
                    <strong>
                      ${esc(x)}
                    </strong>

                    <span>
                      ${count}回
                    </span>
                  </button>
                  <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0">
                    <button type="button" class="secondary small-btn" data-item-minus-cat="${esc(category)}" data-item-minus-key="${esc(x)}" aria-label="${esc(x)}を1回減らす" ${count<=0?'disabled':''}>−1</button>
                    <button type="button" class="primary small-btn" data-item-plus-cat="${esc(category)}" data-item-plus-key="${esc(x)}" aria-label="${esc(x)}を1回増やす">＋1</button>
                  </div>
                </div>
              `;
            }
          ).join('')
        }
      </div>

    </div>
  `;
}

function origiftImageStorageKey(){
  return `avvyOrigiftImages:${state.appUserId||'local'}`;
}
function getOrigiftImageMap(){
  try{return JSON.parse(localStorage.getItem(origiftImageStorageKey())||'{}');}
  catch(_){return {};}
}
function setOrigiftImage(giftId,dataUrl){
  const images=getOrigiftImageMap();
  if(dataUrl) images[String(giftId)]=dataUrl;
  else delete images[String(giftId)];
  try{localStorage.setItem(origiftImageStorageKey(),JSON.stringify(images));}
  catch(_){toast('画像を保存できませんでした。画像サイズを小さくして試してください。');}
}
function readOrigiftImage(file,maxSize=512){
  return new Promise((resolve,reject)=>{
    if(!file){resolve('');return;}
    if(!/^image\/(png|jpeg|webp)$/.test(file.type)){reject(new Error('PNG・JPG・WEBP画像を選択してください'));return;}
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error('画像を読み込めませんでした'));
    reader.onload=()=>{
      const image=new Image();
      image.onerror=()=>reject(new Error('画像を開けませんでした'));
      image.onload=()=>{
        const scale=Math.min(1,maxSize/Math.max(image.width,image.height));
        const canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round(image.width*scale));
        canvas.height=Math.max(1,Math.round(image.height*scale));
        const ctx=canvas.getContext('2d');
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.82));
      };
      image.src=reader.result;
    };
    reader.readAsDataURL(file);
  });
}
function origiftImagePicker(giftId=null){
  const current=giftId ? (getOrigiftImageMap()[String(giftId)]||'') : '';
  const m=modal(`
    <div class="origift-modal-head">
      <button type="button" class="origift-back" id="x" aria-label="閉じる">‹</button>
      <h2>${giftId?'オリギフ画像の変更':'オリギフの作成・編集'}</h2>
      <span class="origift-head-spacer"></span>
    </div>
    <div class="origift-form-layout">
      <div class="origift-image-column">
        <label class="origift-image-picker" for="ogimage">
          <img id="ogimagePreview" src="${current}" alt="" style="${current?'display:block':'display:none'}">
          <span id="ogimagePlaceholder" style="${current?'display:none':''}"><b>＋</b><span>画像を選択<br>(任意)</span></span>
        </label>
        <input id="ogimage" type="file" accept="image/png,image/jpeg,image/webp" hidden>
        <p class="origift-image-note">※ PNG・JPG・WEBPに対応<br>※ 画像はあとから変更できます</p>
        ${current?'<button type="button" class="secondary origift-remove-image" id="removeOgImage">画像を外す</button>':''}
      </div>
      <div class="origift-fields">
        <label for="ogn">ギフト名</label>
        <input id="ogn" placeholder="例）きらきらハート">
        <label for="ogc">コイン数</label>
        <input id="ogc" type="number" min="1" placeholder="例）100" value="5">
      </div>
    </div>
    <div class="origift-modal-actions">
      <button type="button" class="secondary" id="cancelOg">キャンセル</button>
      <button type="button" class="primary" id="ok">保存する</button>
    </div>
  `);
  let selectedImage=current;
  let removeImage=false;
  const fileInput=m.querySelector('#ogimage');
  const preview=m.querySelector('#ogimagePreview');
  const placeholder=m.querySelector('#ogimagePlaceholder');
  const removeBtn=m.querySelector('#removeOgImage');
  fileInput.addEventListener('change',async()=>{
    const file=fileInput.files?.[0];
    if(!file)return;
    try{
      selectedImage=await readOrigiftImage(file);
      removeImage=false;
      preview.src=selectedImage;preview.style.display='block';
      placeholder.style.display='none';
      if(removeBtn)removeBtn.style.display='inline-flex';
    }catch(err){toast(err.message||'画像を読み込めませんでした');fileInput.value='';}
  });
  removeBtn?.addEventListener('click',()=>{
    selectedImage='';removeImage=true;preview.removeAttribute('src');preview.style.display='none';placeholder.style.display='flex';removeBtn.style.display='none';
  });
  m.querySelector('#x').onclick=()=>m.remove();
  m.querySelector('#cancelOg').onclick=()=>m.remove();
  if(giftId){
    const gift=state.gifts.find(g=>String(g.id)===String(giftId));
    if(gift){m.querySelector('#ogn').value=gift.name||'';m.querySelector('#ogc').value=Number(gift.coin)||5;}
  }
  m.querySelector('#ok').onclick=async()=>{
    const name=m.querySelector('#ogn').value.trim();
    const coin=Number(m.querySelector('#ogc').value);
    if(!name||!Number.isFinite(coin)||coin<1){toast('ギフト名とコイン数を入力してください');return;}
    if(giftId){
      const {error}=await sb.from('gift_definitions').update({name,coin}).eq('id',giftId).eq('user_id',state.appUserId);
      if(error){toast(error.message);return;}
      if(selectedImage)setOrigiftImage(giftId,selectedImage);
      else if(removeImage)setOrigiftImage(giftId,'');
      m.remove();await load();toast('オリギフを更新しました');return;
    }
    const {data,error}=await sb.from('gift_definitions').insert({
      user_id:state.appUserId,name,coin,emoji:'🎁',target:10,source:'original',group_name:null,sort_order:0
    }).select('id').single();
    if(error){toast(error.message);return;}
    if(data?.id&&selectedImage)setOrigiftImage(data.id,selectedImage);
    m.remove();await load();toast('オリギフを追加しました');
  };
}

function origiftEnduranceStorageKey(){
  return `avvyOrigiftEnduranceTargets:${state.appUserId||'local'}`;
}
function getOrigiftEnduranceTargets(){
  try{
    const value=JSON.parse(localStorage.getItem(origiftEnduranceStorageKey())||'{}');
    return value && typeof value==='object' ? value : {};
  }catch(_){return {};}
}
function saveOrigiftEnduranceTargets(value){
  try{
    localStorage.setItem(origiftEnduranceStorageKey(),JSON.stringify(value));
    return true;
  }catch(_){
    toast('耐久対象を保存できませんでした');
    return false;
  }
}
async function addOrigiftToEndurance(giftId){
  const gift=state.gifts.find(g=>String(g.id)===String(giftId)&&g.source==='original');
  if(!gift)return;
  const currentTargets=getOrigiftEnduranceTargets();
  if(Object.prototype.hasOwnProperty.call(currentTargets,String(giftId))){
    toast('このギフトはすでに耐久対象です');
    return;
  }
  const currentGoal=Math.max(1,Number(gift.target)||10);
  const input=prompt(`「${gift.name}」の耐久目標個数を入力してください`,String(currentGoal));
  if(input===null)return;
  const goal=Math.floor(Number(input));
  if(!Number.isFinite(goal)||goal<1){
    toast('耐久目標は1以上の整数を入力してください');
    return;
  }
  const {error}=await sb.from('gift_definitions')
    .update({target:goal})
    .eq('id',giftId)
    .eq('user_id',state.appUserId);
  if(error){toast('耐久目標を保存できませんでした：'+error.message);return;}
  currentTargets[String(giftId)]=goal;
  if(!saveOrigiftEnduranceTargets(currentTargets))return;
  await load();
  toast('オリギフ耐久の対象に追加しました');
}
function removeOrigiftFromEndurance(giftId){
  const targets=getOrigiftEnduranceTargets();
  delete targets[String(giftId)];
  if(saveOrigiftEnduranceTargets(targets)){
    render();
    toast('耐久対象から外しました');
  }
}

function origift(){
  if(!state.user)return auth();
  const gs=state.gifts.filter(g=>g.source==='original');
  const imageMap=getOrigiftImageMap();
  const targets=getOrigiftEnduranceTargets();
  const targetGs=gs.filter(g=>Object.prototype.hasOwnProperty.call(targets,String(g.id)));
  const totalGoal=targetGs.reduce((sum,g)=>sum+Math.max(1,Number(targets[String(g.id)])||1),0);
  const progressCount=targetGs.reduce((sum,g)=>sum+Math.min(Number(state.giftCounts[g.id]||0),Math.max(1,Number(targets[String(g.id)])||1)),0);
  const achieved=targetGs.filter(g=>Number(state.giftCounts[g.id]||0)>=Math.max(1,Number(targets[String(g.id)])||1)).length;
  const remaining=Math.max(0,totalGoal-progressCount);
  const pct=totalGoal?Math.round(progressCount/totalGoal*100):0;
  const totalCount=gs.reduce((sum,g)=>sum+Number(state.giftCounts[g.id]||0),0);
  return `
    <div class="origift-page">
      <section class="card origift-header-card">
        <div class="section-head">
          <div>
            <h2>🎨 オリギフ</h2>
            <p class="top-note">あなた専用のオリジナルギフトを作成できます。</p>
          </div>
          <button class="primary" id="newOrigift">＋ 追加</button>
        </div>
      </section>

      <section class="card origift-endurance-card">
        <div class="origift-section-title">
          <h3>🎁 オリギフ耐久</h3>
          <span class="origift-small-count">${achieved} / ${targetGs.length}種類達成</span>
        </div>
        <div class="origift-progress-layout">
          <div class="origift-progress-ring" style="--origift-progress:${pct}%">
            <div class="origift-progress-center">
              <strong>${pct}<span>%</span></strong>
            </div>
          </div>
          <div class="origift-progress-stats">
            <div class="origift-stat">
              <span class="origift-stat-icon">🎁</span>
              <div><span>達成したギフト</span><strong>${achieved} 種類</strong></div>
            </div>
            <div class="origift-stat">
              <span class="origift-stat-icon">🎀</span>
              <div><span>耐久目標数</span><strong>${totalGoal} 個</strong></div>
            </div>
            <div class="origift-stat">
              <span class="origift-stat-icon">◷</span>
              <div><span>残り</span><strong>${remaining} 個</strong></div>
            </div>
          </div>
        </div>
        ${targetGs.length===0?'<div class="empty origift-no-targets">登録ギフト管理から「耐久に追加」を選ぶと、ここに対象ギフトが表示されます。</div>':''}
        ${targetGs.length>0&&progressCount>=totalGoal?'<div class="origift-complete-note">🎉 オリギフ耐久達成！</div>':''}
        <div class="origift-endurance-reset">
          <button type="button" class="danger" id="resetOrigiftEndurance" ${targetGs.length===0?'disabled':''}>オリギフ耐久をリセット</button>
        </div>
      </section>

      <section class="card origift-targets-card">
        <div class="origift-section-title">
          <h3>🎁 耐久対象のギフト</h3>
          <span class="origift-small-count">${targetGs.length}種類</span>
        </div>
        ${targetGs.length ? `
          <div class="origift-target-grid">
            ${targetGs.map(g=>{
              const goal=Math.max(1,Number(targets[String(g.id)])||1);
              const count=Number(state.giftCounts[g.id]||0);
              const giftPct=Math.min(100,Math.round(count/goal*100));
              return `
                <article class="origift-target-item">
                  <div class="origift-target-image">
                    ${imageMap[String(g.id)]?`<img src="${imageMap[String(g.id)]}" alt="">`:`<span>${esc(g.emoji||'🎁')}</span>`}
                  </div>
                  <strong class="origift-target-name">${esc(g.name)}</strong>
                  <span class="origift-target-coin">${Number(g.coin)}C</span>
                  <span class="origift-target-goal">目標 ${goal}個 ・ ${giftPct}%</span>
                  <div class="origift-counter-controls" role="group" aria-label="${esc(g.name)}の個数操作">
                    <button type="button" class="secondary origift-counter-minus" data-origift-minus="${g.id}" ${count<=0?'disabled':''} aria-label="${esc(g.name)}を1個減らす">−1</button>
                    <span class="origift-current-count">${count} / ${goal}個</span>
                    <button type="button" class="primary origift-counter-plus" data-origift-plus="${g.id}" aria-label="${esc(g.name)}を1個増やす">＋1</button>
                  </div>
                  <button type="button" class="secondary small-btn origift-remove-target" data-remove-origift-target="${g.id}">耐久対象から外す</button>
                </article>
              `;
            }).join('')}
          </div>
        ` : `<div class="empty">登録ギフト管理から耐久対象に追加してください。</div>`}
      </section>

      <section class="card origift-management-card">
        <div class="section-head">
          <div>
            <h3>📋 登録したギフトの管理</h3>
            <p class="top-note">ギフト名・画像・コイン数の編集や、耐久対象への追加ができます。</p>
          </div>
          <span class="origift-small-count">${gs.length}種類</span>
        </div>
        ${gs.length ? `
          <div class="origift-management-list">
            ${gs.map(g=>{
              const included=Object.prototype.hasOwnProperty.call(targets,String(g.id));
              return `
                <article class="origift-management-item">
                  <div class="origift-management-image">
                    ${imageMap[String(g.id)]?`<img src="${imageMap[String(g.id)]}" alt="">`:`<span>${esc(g.emoji||'🎁')}</span>`}
                  </div>
                  <div class="origift-management-info">
                    <strong>${esc(g.name)}</strong>
                    <span>${Number(g.coin)}C ・ ${Number(state.giftCounts[g.id]||0)}個</span>
                    ${included?`<small class="origift-target-status">耐久目標：${Number(targets[String(g.id)])}個</small>`:''}
                  </div>
                  <div class="origift-management-actions">
                    ${included
                      ? `<button type="button" class="secondary small-btn" data-remove-origift-target="${g.id}">耐久から外す</button>`
                      : `<button type="button" class="primary small-btn" data-add-origift-target="${g.id}">耐久に追加</button>`}
                    <button type="button" class="secondary small-btn" data-edit-origift="${g.id}">編集</button>
                    <button type="button" class="secondary small-btn" data-edit-origift-image="${g.id}">画像変更</button>
                    <button type="button" class="danger small-btn" data-del-origift="${g.id}">削除</button>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
          <div class="origift-management-footer">
            <span class="counterline">登録ギフト合計 ${totalCount} 個</span>
          </div>
        ` : `<div class="empty">まだオリギフがありません。</div>`}
      </section>
    </div>
  `;
}

function newOrigift(){
  origiftImagePicker();
}

function custom(){
  if(!state.user)return auth();

  const projects=state.customProjects||[];
  let active=projects.find(p=>String(p.id)===String(state.activeCustomProjectId));
  if(!active && projects.length){
    active=projects[0];
    state.activeCustomProjectId=active.id;
  }
  const activeItems=active
    ? Object.values(state.customItems||{})
        .filter(i=>String(i.project_id)===String(active.id))
        .sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))
    : [];
  // 目標モードに応じて「回数」または「達成した項目の種類数」を集計する。
  const activeIsTypes=(active?.goal_mode|| (active?.type==='custom_types'?'types':'count'))==='types';
  const achieved=activeIsTypes
    ? activeItems.filter(item=>Number(state.itemCounts[`custom:${active.id}:${item.id}`]||0)>0).length
    : activeItems.reduce((sum,item)=>sum+Number(state.itemCounts[`custom:${active.id}:${item.id}`]||0),0);
  const total=Math.max(0,Number(active?.goal)||0);
  const remaining=Math.max(0,total-achieved);
  const percent=total?Math.min(100,Math.round(achieved/total*100)):0;

  return `
    <div class="custom-page">
      <section class="card custom-active-card">
        <div class="section-head">
          <div>
            <h2>✨ 耐久中！</h2>
            <p class="top-note">${active ? `現在挑戦中：${esc(active.name)}` : '管理から耐久を選ぶと、ここでカウントできます'}</p>
          </div>
          ${active ? `<button class="secondary" id="manageActiveCustom" data-manage-custom="${active.id}">項目管理</button>` : ''}
        </div>
        ${active ? `
          <div class="custom-progress-layout">
            <div class="custom-progress-ring" style="--custom-progress:${percent}%">
              <div class="custom-progress-center"><strong>${percent}<span>%</span></strong><small>達成率</small></div>
            </div>
            <div class="custom-progress-stats">
              <div class="custom-stat"><span>達成した数</span><strong>${achieved}</strong></div>
              <div class="custom-stat"><span>耐久目標数</span><strong>${total}</strong></div>
              <div class="custom-stat"><span>残り</span><strong>${remaining}</strong></div>
            </div>
          </div>
          ${activeItems.length ? `
            <div class="custom-active-items">
              ${activeItems.map(item=>{
                const count=Number(state.itemCounts[`custom:${active.id}:${item.id}`]||0);
                return `<div class="custom-count-row">
                  <div class="custom-count-name"><strong>${esc(item.name)}</strong><small>${count>0?'達成済み':'未達成'} · ${count}回</small></div>
                  <div class="custom-count-controls">
                    <button type="button" class="secondary" data-custom-count-minus="${item.id}" data-custom-project="${active.id}" ${count<=0?'disabled':''}>−1</button>
                    <strong>${count}</strong>
                    <button type="button" class="primary" data-custom-count-plus="${item.id}" data-custom-project="${active.id}">＋1</button>
                  </div>
                </div>`;
              }).join('')}
            </div>
            <div class="row custom-active-actions">
              <button type="button" class="danger" id="resetActiveCustom" data-reset-custom="${active.id}">この耐久をリセット</button>
            </div>
          ` : `<div class="empty">まだ項目がありません。「項目管理」から「あ〜ん」などの項目を追加してね。</div>`}
        ` : `<div class="empty">まだカスタム耐久がありません。下の「＋新規作成」から作成してね。</div>`}
      </section>

      <section class="card custom-management-card">
        <div class="section-head">
          <div><h2>📋 管理</h2><p class="top-note">耐久するものを選ぶと、上の「耐久中！」に表示されます。</p></div>
          <button class="primary" id="newCustom">＋ 新規作成</button>
        </div>
        ${projects.length ? `<div class="list">
          ${projects.map(p=>{
            const items=Object.values(state.customItems||{}).filter(i=>String(i.project_id)===String(p.id));
            const isTypes=(p.goal_mode|| (p.type==='custom_types'?'types':'count'))==='types';
            const done=isTypes
              ? items.filter(item=>Number(state.itemCounts[`custom:${p.id}:${item.id}`]||0)>0).length
              : items.reduce((sum,item)=>sum+Number(state.itemCounts[`custom:${p.id}:${item.id}`]||0),0);
            const goal=Math.max(0,Number(p.goal)||0);
            const isActive=String(active?.id)===String(p.id);
            return `<div class="custom-project-row ${isActive?'is-active':''}">
              <div class="custom-project-info"><strong>${esc(p.name)}</strong><small>${done}/${goal} ${isTypes?'種類':'回'} · 残り ${Math.max(0,goal-done)} ${isTypes?'種類':'回'}</small></div>
              <div class="custom-project-actions">
                <button type="button" class="${isActive?'secondary':'primary'}" data-select-custom="${p.id}">${isActive?'挑戦中':'耐久する →'}</button>
                <button type="button" class="secondary" data-manage-custom="${p.id}">項目管理</button>
                <button type="button" class="danger" data-delete-custom="${p.id}">削除</button>
              </div>
            </div>`;
          }).join('')}
        </div>` : `<div class="empty">作成したカスタム耐久はありません。</div>`}
      </section>
    </div>
  `;
}

function settings(){
  if(!state.user)return auth();

  const displayName=
    state.profile?.display_name||
    'Avvyユーザー';

  const userCode=
    state.appUser?.user_code||'';

  return `
    <div class="grid">

      <div class="card">

        <h2>
          👤 アカウント
        </h2>

        <p class="muted">
          現在のユーザー名
        </p>

        <p
          style="
            font-size:20px;
            font-weight:700;
            margin:6px 0 18px;
          "
        >
          ${esc(displayName)}
        </p>

        <div class="form">

          <label>
            ユーザー名を変更
          </label>

          <input
            id="newDisplayName"
            type="text"
            maxlength="30"
            value="${esc(displayName)}"
            placeholder="例：あびぃちゃん"
          >

          <button
            class="primary"
            id="saveDisplayName"
            type="button"
          >
            ユーザー名を変更する
          </button>

        </div>

        <div
          style="
            margin-top:18px;
            padding:12px;
            border-radius:10px;
            background:var(
              --accent-soft,
              rgba(0,0,0,.05)
            );
          "
        >

          <div
            class="muted"
            style="font-size:13px;"
          >
            ユーザーコード
          </div>

          <strong
            id="userCodeDisplay"
            style="
              font-size:20px;
              letter-spacing:1px;
            "
          >
            ${esc(userCode)}
          </strong>

        </div>

        <p class="muted">
          このコードを別の端末で入力すると、
          データを引き継げます。
        </p>

        <div
          class="row"
          style="margin-top:10px;"
        >

          <button
            class="secondary"
            id="copyUserCode"
          >
            📋 コードをコピー
          </button>

        </div>

        <button
          class="danger"
          id="logout"
          style="margin-top:12px;"
        >
          ログアウト
        </button>

      </div>

      <div class="card">

        <h2>
          🔄 アプリの再読み込み
        </h2>

        <p class="muted">
          画面を読み込み直します。変更が反映されないときに使ってください。
        </p>

        <button
          class="secondary"
          id="reloadAppBtn"
          type="button"
        >
          🔄 今すぐ再読み込み
        </button>

      </div>

      <div class="card">

        <h2>
          🌓 表示モード
        </h2>

        <p class="muted">
          ホワイトモードとダークモードを切り替えられます。
        </p>

        <div class="row">

          <button
            class="${state.themeMode==='light'?'primary':'secondary'}"
            data-theme-mode="light"
          >
            ☀️ ホワイト
          </button>

          <button
            class="${state.themeMode==='dark'?'primary':'secondary'}"
            data-theme-mode="dark"
          >
            🌙 ダーク
          </button>

        </div>

      </div>

      <div class="card">

        <h2>
          🎨 ボタンカラー
        </h2>

        <p class="muted">
          ユーザー名横の⚙️から、
          ボタン・進捗バー・アクセントカラーを変更できます。
        </p>

        <div class="row">

          <span
            class="pill"
            style="
              background:${state.accentColor};
              color:#fff
            "
          >
            現在のカラー
          </span>

          <button
            class="secondary"
            id="openAppearance"
          >
            色を変更
          </button>

        </div>

      </div>

      <div class="card">

        <h2>
          ✨ カスタム耐久管理
        </h2>

        <p class="muted">
          カスタム耐久で使用する項目を管理できます。
        </p>

        <div id="customManageList">

          ${
            state.customProjects?.length
              ? state.customProjects.map(
                  p=>`
                    <div
                      class="card"
                      style="
                        margin-top:12px;
                        padding:14px;
                      "
                    >

                      <div
                        style="
                          display:flex;
                          justify-content:space-between;
                          align-items:center;
                          gap:10px;
                        "
                      >

                        <div>

                          <strong>
                            ✨ ${esc(p.name)}
                          </strong>

                          <div class="muted">
                            目標 ${Number(p.goal)||0}
                          </div>

                        </div>

                        <div class="row">

                          <button
                            class="secondary"
                            data-manage-custom="${p.id}"
                          >
                            項目管理
                          </button>

                          <button
                            class="danger"
                            data-delete-custom="${p.id}"
                          >
                            耐久を削除
                          </button>

                        </div>

                      </div>

                    </div>
                  `
                ).join('')
              : `
                <div class="empty">
                  作成したカスタム耐久はありません。
                </div>
              `
          }

        </div>

      </div>

      <div class="card">

        <h2>
          ☁️ クラウド
        </h2>

        <p class="muted">
          耐久データと表示設定をクラウドに保存しています。
        </p>

      </div>

    </div>
  `;
}

function page(){
  if(
    !state.user&&
    !hasConfig()
  ){
    return `
      <div class="card">
        <h2>
          Supabase接続設定が必要です
        </h2>

        <p>
          config.jsを確認してください。
        </p>
      </div>
    `;
  }

  if(!state.user){
    return auth();
  }

  if(state.tab==='home'){
    return home();
  }

  if(state.tab==='gift'){
    return gift();
  }

  if(state.tab==='entry'){
    return entryEndurance();
  }

  if(state.tab==='pref'){
    return choicePage(
      '都道府県',
      '📍',
      'pref',
      PREF
    );
  }

  if(state.tab==='mbti'){
    return choicePage(
      'MBTI',
      '🧠',
      'mbti',
      MBTI
    );
  }

  if(state.tab==='zodiac'){
    return choicePage(
      '星座',
      '⭐',
      'zodiac',
      ZODIAC
    );
  }

  if(state.tab==='origift'){
    return origift();
  }

  if(state.tab==='custom'){
    return custom();
  }

  return settings();
}


/* ==================================================
   入室耐久
   ================================================== */

function circularProgressSummary({pct,label,primary,secondary,complete=false}){
  const safePct=Math.max(0,Math.min(100,Number(pct)||0));
  return `
    <div class="circle-progress-summary">
      <div class="overall-progress-ring" style="--progress:${safePct}%">
        <div class="overall-progress-inner">
          <strong>${Math.round(safePct)}<span>%</span></strong>
        </div>
      </div>
      <div class="circle-progress-details">
        <div class="circle-progress-label">${esc(label||'進捗')}</div>
        <strong>${primary}</strong>
        <span>${secondary}</span>
        ${complete?'<div class="complete-badge">🎉 達成！</div>':''}
      </div>
    </div>
  `;
}

function entryEndurance(){
  const goal=Math.max(1,Number(state.entryGoal)||100);
  const count=Math.max(0,Number(state.entryCount)||0);
  const pct=Math.min(100,count/goal*100);
  const sections=[
    {id:'coin',title:'コイン救済',icon:'🪙',description:'条件・対象ギフト・加算数を設定'},
    {id:'first',title:'初見入室救済',icon:'👋',description:'初見さん用の加算ボタンを作成'},
    {id:'other',title:'その他の救済',icon:'⚙️',description:'好きな名前の救済ボタンを作成'}
  ];
  return `
    <div class="card">
      <div class="section-head">
        <div>
          <h2>🚪 入室耐久</h2>
          <p class="top-note">入室数を手動で記録し、救済ルールも自由に設定できます。</p>
        </div>
        <button class="danger" id="resetEntry">リセット</button>
      </div>
      ${circularProgressSummary({
        pct,
        label:'入室耐久',
        primary:`${count} / ${goal}人`,
        secondary:`目標まであと ${Math.max(0,goal-count)}人`,
        complete:count>=goal
      })}
      <div class="row" style="margin:12px 0;align-items:center;flex-wrap:wrap">
        <button class="secondary" id="entryMinus">−1</button>
        <button class="primary" id="entryPlus">＋1 入室</button>
        <label style="display:flex;gap:8px;align-items:center">
          目標人数
          <input id="entryGoalInput" type="number" min="1" value="${goal}" style="width:100px">
        </label>
      </div>
      <h3 style="margin-top:22px">救済ルール</h3>
      <p class="muted">項目を開いてルールを追加。登録した「＋〇」を押すと入室数に加算されます。</p>
      ${sections.map(section=>{
        const open=state.entryOpenSection===section.id;
        const rules=state.entryRules.filter(rule=>rule.type===section.id);
        return `
          <section class="event-setting-box" style="margin-top:10px">
            <button type="button" class="secondary" data-entry-toggle="${section.id}" style="width:100%;display:flex;justify-content:space-between;align-items:center">
              <span>${section.icon} ${section.title}</span>
              <span>${open?'▴':'▾'}</span>
            </button>
            ${open?`
              <div style="padding:12px 0">
                ${rules.length?rules.map(rule=>`
                  <div class="item" style="gap:8px;flex-wrap:wrap">
                    <span style="flex:1;min-width:130px">
                      <b>${esc(rule.name)}</b>
                      ${rule.type==='coin'?`<br><small class="muted">${esc(rule.scope==='selected'?'指定ギフト':'全ギフト')}・${Number(rule.threshold)||0}コインごと</small>`:''}
                    </span>
                    <button class="primary" data-entry-add="${esc(rule.id)}">＋${Number(rule.amount)||1}</button>
                    <button class="secondary" data-entry-edit="${esc(rule.id)}" title="編集">編集</button>
                    <button class="danger" data-entry-delete="${esc(rule.id)}">削除</button>
                  </div>
                `).join(''):'<div class="empty">まだルールがありません。</div>'}
                <button class="secondary" data-entry-new="${section.id}" style="margin-top:10px;width:100%">＋ 救済ルールを追加</button>
              </div>
            `:''}
          </section>
        `;
      }).join('')}
    </div>
  `;
}

async function saveEntrySettings(){
  if(!sb||!state.appUserId){
    toast('ログイン後に保存できます');
    return false;
  }
  const payload={
    user_id:state.appUserId,
    entry_count:Math.max(0,Math.floor(Number(state.entryCount)||0)),
    entry_goal:Math.max(1,Math.floor(Number(state.entryGoal)||100)),
    rules:state.entryRules,
    updated_at:new Date().toISOString()
  };
  const {error}=await sb.from('entry_endurance_settings').upsert(payload,{onConflict:'user_id'});
  if(error){
    console.error('入室耐久保存エラー:',error);
    toast('入室耐久を保存できません。SQL設定を確認してください。');
    return false;
  }
  return true;
}

function openEntryRuleEditor(type, existing=null){
  const titles={coin:'コイン救済',first:'初見入室救済',other:'その他の救済'};
  const rule=existing||{id:`entry-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,type,name:'',amount:1,scope:'all',threshold:50,giftIds:[]};
  const m=modal(`
    <div class="section-head">
      <h2>${existing?'救済ルールを編集':'救済ルールを追加'}</h2>
      <button class="iconbtn" id="entryRuleClose">×</button>
    </div>
    <div class="form">
      <label>ルール名</label>
      <input id="entryRuleName" maxlength="60" placeholder="${type==='coin'?'例：50コイン救済':type==='first'?'例：初見さん入室':'例：コメント救済'}" value="${esc(rule.name)}">
      ${type==='coin'?`
        <label>対象ギフト</label>
        <select id="entryRuleScope">
          <option value="all" ${rule.scope!=='selected'?'selected':''}>全ギフトのコイン合計</option>
          <option value="selected" ${rule.scope==='selected'?'selected':''}>指定ギフト（手動ボタン運用）</option>
        </select>
        <label>何コインごと？</label>
        <input id="entryRuleThreshold" type="number" min="1" value="${Number(rule.threshold)||50}">
        <p class="muted">ここで設定する条件はルールの目安表示です。加算は登録後の「＋〇」ボタンを押したときに行います。</p>
      `:''}
      <label>タップ時の入室加算数</label>
      <input id="entryRuleAmount" type="number" min="1" step="1" value="${Number(rule.amount)||1}">
      <button class="primary" id="entryRuleSave">保存</button>
    </div>
  `);
  m.querySelector('#entryRuleClose').onclick=()=>m.remove();
  m.querySelector('#entryRuleSave').onclick=async()=>{
    const name=m.querySelector('#entryRuleName').value.trim();
    const amount=Math.floor(Number(m.querySelector('#entryRuleAmount').value));
    if(!name){toast('ルール名を入力してください');return;}
    if(!Number.isFinite(amount)||amount<1){toast('加算数は1以上で入力してください');return;}
    const updated={
      ...rule,name,amount,
      ...(type==='coin'?{
        scope:m.querySelector('#entryRuleScope').value,
        threshold:Math.max(1,Math.floor(Number(m.querySelector('#entryRuleThreshold').value)||1))
      }:{})
    };
    if(existing){
      state.entryRules=state.entryRules.map(x=>x.id===existing.id?updated:x);
    }else{
      state.entryRules=[...state.entryRules,updated];
    }
    m.remove();
    render();
    await saveEntrySettings();
  };
}

async function bindEntryEndurance(){
  $('#entryPlus')?.addEventListener('click',async()=>{
    state.entryCount=Math.max(0,Number(state.entryCount)||0)+1;
    render(); await saveEntrySettings();
  });
  $('#entryMinus')?.addEventListener('click',async()=>{
    state.entryCount=Math.max(0,(Number(state.entryCount)||0)-1);
    render(); await saveEntrySettings();
  });
  $('#entryGoalInput')?.addEventListener('change',async e=>{
    state.entryGoal=Math.max(1,Math.floor(Number(e.target.value)||1));
    render(); await saveEntrySettings();
  });
  $('#resetEntry')?.addEventListener('click',async()=>{
    if(!confirm('入室カウントを0に戻しますか？'))return;
    state.entryCount=0; render(); await saveEntrySettings();
  });
  document.querySelectorAll('[data-entry-toggle]').forEach(b=>b.onclick=()=>{
    state.entryOpenSection=state.entryOpenSection===b.dataset.entryToggle?'':b.dataset.entryToggle;
    render();
  });
  document.querySelectorAll('[data-entry-new]').forEach(b=>b.onclick=()=>{
    openEntryRuleEditor(b.dataset.entryNew);
  });
  document.querySelectorAll('[data-entry-add]').forEach(b=>b.onclick=async()=>{
    const rule=state.entryRules.find(x=>String(x.id)===b.dataset.entryAdd);
    if(!rule)return;
    state.entryCount=Math.max(0,Number(state.entryCount)||0)+Math.max(1,Math.floor(Number(rule.amount)||1));
    render(); await saveEntrySettings();
  });
  document.querySelectorAll('[data-entry-edit]').forEach(b=>b.onclick=()=>{
    const rule=state.entryRules.find(x=>String(x.id)===b.dataset.entryEdit);
    if(rule)openEntryRuleEditor(rule.type,rule);
  });
  document.querySelectorAll('[data-entry-delete]').forEach(b=>b.onclick=async()=>{
    const rule=state.entryRules.find(x=>String(x.id)===b.dataset.entryDelete);
    if(!rule||!confirm(`「${rule.name}」を削除しますか？`))return;
    state.entryRules=state.entryRules.filter(x=>x.id!==rule.id);
    render(); await saveEntrySettings();
  });
}

/* ==================================================
   ここが今回追加した render()
   ================================================== */

function ensureGiftUiStyles(){
  if(document.getElementById('avvy-gift-ui-styles')) return;
  const style=document.createElement('style');
  style.id='avvy-gift-ui-styles';
  style.textContent=`
    .gift-ui{--gift-pink:var(--primary);--gift-pink-dark:var(--accent-ink);--gift-pink-soft:var(--accent-soft);--gift-pink-line:var(--line);}
    /* Step 3: softer, clearer interaction controls */
    .gift-ui .gift-card{position:relative;gap:9px!important;padding:9px!important;border-radius:17px!important;}
    .gift-ui .gift-card.is-achieved{border-color:var(--primary);background:linear-gradient(180deg,var(--surface) 0%,var(--accent-soft) 100%);}
    .gift-ui .gift-card.is-unachieved{background:var(--surface);border-color:var(--line);}
    .gift-ui .gift-card .gift-btn{min-height:82px;border-radius:14px!important;box-shadow:0 2px 0 rgba(185,95,105,.06);}
    .gift-ui .gift-card .gift-btn:active{transform:scale(.985);}
    .gift-ui .gift-card [data-gift-minus]{min-width:58px;min-height:36px;padding:6px 15px;border:1px solid #efcaca!important;background:#fff!important;color:#a9515b!important;font-weight:800;}
    .gift-ui .gift-card [data-gift-minus]:disabled{opacity:.4;cursor:not-allowed;}
    .gift-ui button:focus-visible{outline:3px solid rgba(233,143,143,.45);outline-offset:2px;}
    .gift-ui .target-summary{padding:15px 16px;border:1px solid var(--line);border-radius:17px;background:linear-gradient(135deg,var(--accent-soft),var(--surface));}
    .gift-ui .progress{height:10px;border-radius:99px;background:var(--soft);overflow:hidden;}
    .gift-ui .progress i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--primary2),var(--primary));transition:width .25s ease;}
    .gift-ui .complete-badge{display:inline-flex;align-items:center;gap:5px;margin-top:10px;padding:6px 11px;border-radius:999px;background:#ffe5e7;color:#a34d58;font-weight:800;font-size:.85rem;}
    .gift-ui.gift-collection .collection-goal{border-radius:19px!important;background:linear-gradient(180deg,#fff 0%,#fff8f8 100%);box-shadow:0 4px 14px rgba(185,95,105,.06);}
    .gift-ui.gift-collection .collection-goal [data-collection-plus]{background:#e98f8f!important;border-color:#e98f8f!important;color:#fff!important;min-width:48px;min-height:38px;font-weight:800;}
    .gift-ui.gift-collection .collection-goal [data-collection-minus]{background:#fff!important;border:1px solid #efcaca!important;color:#a9515b!important;min-width:48px;min-height:38px;font-weight:800;}
    .gift-ui.gift-collection .collection-goal [data-remove-collection-goal]{font-size:.84rem;}
    .gift-ui .event-group{box-shadow:0 3px 12px rgba(185,95,105,.035);}
    @media(max-width:600px){
      .gift-ui .gift-card{padding:6px!important;border-radius:14px!important;}
      .gift-ui .gift-card .gift-btn{min-height:74px;padding:9px 5px;font-size:.93rem;}
      .gift-ui .gift-card [data-gift-minus]{min-height:38px;min-width:64px;}
      .gift-ui .target-summary{padding:12px;}
      .gift-ui.gift-collection .collection-goal{padding:12px!important;}
    }

    .gift-ui.gift-endurance,.gift-ui.gift-collection{background:#fff;border:1px solid var(--gift-pink-line);border-radius:22px;box-shadow:0 8px 24px rgba(190,105,105,.07);padding:clamp(14px,2.5vw,24px);}
    .gift-ui .section-head{align-items:center;gap:12px;margin-bottom:16px;}
    .gift-ui .section-head h2{margin:0 0 5px;font-size:clamp(1.2rem,2.5vw,1.55rem);letter-spacing:.01em;}
    .gift-ui .top-note{line-height:1.6;}
    .gift-ui .gift-switch{background:var(--gift-pink-soft)!important;color:var(--gift-pink-dark)!important;border:1px solid #efbcbc!important;border-radius:999px!important;font-weight:700;min-height:42px;padding:10px 17px;box-shadow:0 2px 0 rgba(185,95,105,.08);transition:transform .15s ease,background .15s ease;}
    .gift-ui .gift-switch:hover{background:#ffe3e3!important;transform:translateY(-1px);}
    .gift-ui .coin-group,.gift-ui .event-group{margin:18px 0;padding:15px;border:1px solid var(--gift-pink-line);border-radius:18px;background:linear-gradient(180deg,#fff 0%,#fffafa 100%);}
    .gift-ui .coin-head{gap:10px;}
    .gift-ui .coin-title{font-size:1.15rem;font-weight:800;color:#a9515b;}
    .gift-ui .gift-category,.gift-ui .mascot-group{margin-top:12px;padding:12px;border-radius:14px;background:#fff6f6;border:1px solid #f8e3e3;}
    .gift-ui .gift-category h4,.gift-ui .mascot-group h5{margin:0 0 10px;color:#96545b;}
    .gift-ui .gift-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,130px),1fr));gap:10px;}
    .gift-ui .gift-card{padding:7px;border:1px solid #f3dede;border-radius:15px;background:#fff;box-shadow:0 3px 10px rgba(185,95,105,.045);transition:border-color .15s ease,box-shadow .15s ease;}
    .gift-ui .gift-card.is-achieved{border-color:#e7a5aa;background:linear-gradient(180deg,#fff 0%,#fff5f5 100%);box-shadow:0 3px 12px rgba(185,95,105,.09);}
    .gift-ui .gift-card.is-achieved::before{content:"✓ 達成";display:inline-flex;align-self:flex-start;align-items:center;padding:3px 8px;border-radius:999px;background:#fce5e7;color:#a9515b;font-size:.72rem;font-weight:800;letter-spacing:.02em;}
    .gift-ui .gift-card.is-unachieved::before{content:"未達成";display:inline-flex;align-self:flex-start;padding:3px 8px;border-radius:999px;background:#f7f7f7;color:#8b8585;font-size:.72rem;font-weight:700;}
    .gift-ui .target-summary{margin:12px 0 16px;padding:14px 16px;border:1px solid #f3dada;border-radius:16px;background:#fff8f8;}
    .gift-ui .target-main{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;}
    .gift-ui .target-main strong{font-size:1.2rem;color:#9f4e58;}
    .gift-ui .target-main span{font-size:.9rem;color:#956b70;}
    .gift-ui .summary-label{margin-top:4px;color:#9b656b;font-size:.82rem;font-weight:700;}
    .gift-ui .progress{height:10px;margin-top:10px;border-radius:999px;overflow:hidden;background:#f4e5e5;}
    .gift-ui .progress i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#f2b4b4,#e98f8f);transition:width .25s ease;}
    .gift-ui .complete-badge{margin-top:10px;padding:9px 12px;border-radius:12px;background:#fce5e7;color:#9f4e58;text-align:center;font-weight:800;}
    .gift-ui .event-coin{margin:12px 0;padding:12px;border-radius:14px;background:#fff7f7;border:1px solid #f6e0e0;}
    .gift-ui .event-coin h4{margin:0;color:#a9515b;}
    .gift-ui .gift-btn{min-height:76px;border:1px solid #f0caca!important;border-radius:12px!important;background:#fff1f1!important;color:#7f4149!important;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:10px 7px;white-space:normal;overflow-wrap:anywhere;transition:transform .12s ease,background .12s ease;}
    .gift-ui .gift-btn:hover{background:#ffe4e4!important;transform:translateY(-1px);}
    .gift-ui .gift-btn span{font-size:.88rem;font-weight:800;color:#b65e68;}
    .gift-ui .gift-card .secondary,.gift-ui .small-btn{border-radius:999px;}
    .gift-ui .pill{background:#fff0f0;color:#a9515b;border:1px solid #f3d4d4;}
    .gift-ui .gift-summary,.gift-ui .summary{border-radius:16px;}
    .gift-ui .empty{border:1px dashed #e9bcbc;background:#fff8f8;border-radius:14px;padding:18px;color:#98666b;}
    .gift-ui.gift-collection .collection-goal{margin:12px 0;padding:16px;border:1px solid var(--gift-pink-line);border-radius:17px;background:#fffafa;}
    .gift-ui.gift-collection [data-collection-plus]{border-radius:999px;min-width:48px;}
    .gift-ui.gift-collection [data-collection-minus]{border-radius:999px;min-width:48px;}
    .gift-ui .danger{border-radius:999px;}
    /* Step 4: polish hierarchy and tap targets without changing app logic */
    .gift-ui .section-head{gap:12px;margin-bottom:16px;}
    .gift-ui .section-head h2,.gift-ui .section-head h3{letter-spacing:.01em;line-height:1.35;}
    .gift-ui .gift-switch{display:flex;gap:8px;flex-wrap:wrap;}
    .gift-ui .gift-switch button{min-height:42px;padding:10px 15px;border-radius:999px;font-weight:800;box-shadow:0 2px 0 rgba(185,95,105,.07);}
    .gift-ui .gift-card{border:1px solid #f2dddd;box-shadow:0 3px 12px rgba(185,95,105,.045);}
    .gift-ui .gift-card.is-achieved{box-shadow:0 3px 13px rgba(185,95,105,.10);}
    .gift-ui .gift-card .gift-btn{line-height:1.35;overflow-wrap:anywhere;}
    .gift-ui .target-summary{box-shadow:0 4px 16px rgba(185,95,105,.045);}
    .gift-ui .event-coin h4{line-height:1.4;}
    .gift-ui button{touch-action:manipulation;}
    @media(max-width:600px){
      .gift-ui.gift-endurance,.gift-ui.gift-collection{padding:13px;border-radius:17px;}
      .gift-ui .section-head{align-items:flex-start;}
      .gift-ui .section-head>div:last-child{width:100%;}
      .gift-ui .gift-switch{width:100%;}
      .gift-ui .coin-group,.gift-ui .event-group{padding:10px;margin:13px 0;}
      .gift-ui .gift-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}
      .gift-ui .gift-card{padding:5px;}
      .gift-ui .gift-card.is-achieved::before,.gift-ui .gift-card.is-unachieved::before{font-size:.67rem;padding:3px 7px;}
      .gift-ui .target-summary{padding:11px 12px;}
      .gift-ui .target-main strong{font-size:1.08rem;}
      .gift-ui .event-coin{padding:9px;}
      .gift-ui .gift-btn{min-height:76px;font-size:.92rem;}
      .gift-ui .gift-switch{display:grid;grid-template-columns:1fr;gap:8px;}
      .gift-ui .gift-switch button{width:100%;min-height:44px;}
      .gift-ui .gift-card [data-gift-minus]{min-width:54px;min-height:40px;}
      .gift-ui.gift-collection [data-collection-plus],.gift-ui.gift-collection [data-collection-minus]{min-width:44px;min-height:40px;}
      .gift-ui .target-main{align-items:flex-start;}
      .gift-ui .target-main strong{overflow-wrap:anywhere;}
    }

    /* Step 5: paired plus/minus controls inspired by the earlier gift-card mockup */
    .gift-ui .gift-counter-controls{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:1px;}
    .gift-ui .gift-counter-btn{display:flex;align-items:center;justify-content:center;gap:5px;min-width:0;min-height:42px;padding:7px 10px;border-radius:12px!important;font-weight:800;line-height:1;border:1px solid #efcaca!important;box-shadow:0 2px 0 rgba(185,95,105,.07);transition:transform .12s ease,filter .12s ease,box-shadow .12s ease;}
    .gift-ui .gift-counter-btn span{font-size:1.15rem;line-height:1;}
    .gift-ui .gift-counter-btn small{font-size:.78rem;font-weight:800;}
    .gift-ui .gift-counter-minus{background:#fff!important;color:#ad6970!important;border-color:#f0dada!important;}
    .gift-ui .gift-counter-plus{background:linear-gradient(180deg,var(--primary2) 0%,var(--primary) 100%)!important;color:#fff!important;border-color:var(--primary)!important;box-shadow:0 3px 0 var(--accent-ink);}
    .gift-ui .gift-counter-btn:hover:not(:disabled){filter:brightness(.99);transform:translateY(-1px);}
    .gift-ui .gift-counter-btn:active:not(:disabled){transform:translateY(1px);box-shadow:none;}
    .gift-ui .gift-counter-btn:focus-visible{outline:3px solid #f4b8bd;outline-offset:2px;}
    .gift-ui .gift-counter-btn:disabled{opacity:.38;cursor:not-allowed;box-shadow:none;}
    .gift-ui .gift-card .gift-btn{cursor:default;user-select:text;}
    @media(max-width:600px){
      .gift-ui .gift-counter-controls{gap:6px;}
      .gift-ui .gift-counter-btn{min-height:42px;padding:7px 5px;border-radius:11px!important;}
    }
  `;
  document.head.appendChild(style);
}

function render(){

  const root=
    $('#app')||
    $('#root')||
    document.querySelector('main');

  if(!root){
    console.error(
      '表示先の要素が見つかりません。#app / #root / main を確認してください。'
    );
    return;
  }

  ensureGiftUiStyles();
  applyTheme();

  if(state.loading){
    root.innerHTML=`
      ${state.user?header():''}

      <main class="container">
        <div
          class="card"
          style="
            text-align:center;
            padding:40px 20px;
          "
        >
          <div
            style="
              font-size:32px;
              margin-bottom:10px;
            "
          >
            ☁️
          </div>

          <strong>
            読み込み中…
          </strong>

          <p class="muted">
            データを確認しています。
          </p>
        </div>
      </main>
    `;

    bind();
    return;
  }

  root.innerHTML=`
    ${header()}

    <main class="container">
      ${page()}
    </main>
  `;

  bind();
}


/* ==================================================
   ギフト関連
   ================================================== */

async function incrementGift(id){
  if(
    !sb||
    !state.user||
    !state.appUserId||
    String(id).startsWith('demo-')
  ){
    if(
      String(id).startsWith('demo-')
    ){
      toast(
        'このサンプルギフトは「ギフト管理」から登録すると保存できます。'
      );
    }

    return;
  }

  const next=
    Number(
      state.giftCounts[id]||0
    )+1;

  const {error}=
    await sb
      .from('gift_counts')
      .upsert(
        {
          user_id:state.appUserId,
          gift_id:id,
          count:next,
          updated_at:new Date().toISOString()
        },
        {
          onConflict:
            'user_id,gift_id'
        }
      );

  if(error){
    toast(error.message);
  }else{
    state.giftCounts[id]=next;
    render();
  }
}

async function decrementGift(id){
  if(!sb||!state.user||!state.appUserId)return;
  const current=Number(state.giftCounts[id]||0);
  if(current<=0){toast('カウントは0未満にできません');return;}
  const next=current-1;
  if(next===0){
    const {error}=await sb.from('gift_counts').delete().eq('user_id',state.appUserId).eq('gift_id',id);
    if(error){toast('カウントを減らせませんでした：'+error.message);return;}
    delete state.giftCounts[id];
  }else{
    const {error}=await sb.from('gift_counts').upsert({user_id:state.appUserId,gift_id:id,count:next,updated_at:new Date().toISOString()},{onConflict:'user_id,gift_id'});
    if(error){toast('カウントを減らせませんでした：'+error.message);return;}
    state.giftCounts[id]=next;
  }
  render();
  toast('カウントを1個減らしました');
}

async function resetSingleGift(id){
  if(!sb||!state.user||!state.appUserId)return;
  const gift=state.gifts.find(g=>String(g.id)===String(id));
  if(!gift||gift.source!=='season')return;
  if(!confirm(`「${gift.name}」のカウントを0に戻しますか？`))return;
  const {error}=await sb.from('gift_counts').delete().eq('user_id',state.appUserId).eq('gift_id',id);
  if(error){toast('個別リセットに失敗しました：'+error.message);return;}
  delete state.giftCounts[id];
  render();
  toast(`${gift.name}をリセットしました`);
}

async function resetCoin(
  coin,
  source='official'
){
  const ids=
    state.gifts
      .filter(
        g=>
          Number(g.coin)===Number(coin)&&
          g.source===source
      )
      .map(g=>g.id);

  if(!ids.length)return;

  const {error}=
    await sb
      .from('gift_counts')
      .delete()
      .eq('user_id',state.appUserId)
      .in('gift_id',ids);

  if(error){
    toast(error.message);
  }else{
    ids.forEach(
      id=>delete state.giftCounts[id]
    );

    render();

    toast(
      `${coin}Cをリセットしました`
    );
  }
}

async function incrementItem(
  cat,
  key
){
  if(
    !sb||
    !state.user||
    !state.appUserId
  ){
    return;
  }

  const k=cat+':'+key;

  const next=
    Number(
      state.itemCounts[k]||0
    )+1;

  const {error}=
    await sb
      .from('endurance_item_counts')
      .upsert(
        {
          user_id:state.appUserId,
          category:cat,
          item_key:key,
          count:next,
          updated_at:new Date().toISOString()
        },
        {
          onConflict:
            'user_id,category,item_key'
        }
      );

  if(error){
    toast(error.message);
  }else{
    state.itemCounts[k]=next;
    render();
  }
}

async function decrementItem(
  cat,
  key
){
  if(
    !sb||
    !state.user||
    !state.appUserId
  ){
    return;
  }

  const k=cat+':'+key;
  const current=Number(state.itemCounts[k]||0);
  if(current<=0)return;

  const next=current-1;
  if(next===0){
    const {error}=await sb
      .from('endurance_item_counts')
      .delete()
      .eq('user_id',state.appUserId)
      .eq('category',cat)
      .eq('item_key',key);

    if(error){
      toast(error.message);
      return;
    }
    delete state.itemCounts[k];
  }else{
    const {error}=await sb
      .from('endurance_item_counts')
      .upsert({
        user_id:state.appUserId,
        category:cat,
        item_key:key,
        count:next,
        updated_at:new Date().toISOString()
      },{
        onConflict:'user_id,category,item_key'
      });

    if(error){
      toast(error.message);
      return;
    }
    state.itemCounts[k]=next;
  }
  render();
}

async function resetCategory(cat){
  const {error}=
    await sb
      .from('endurance_item_counts')
      .delete()
      .eq('user_id',state.appUserId)
      .eq('category',cat);

  if(error){
    toast(error.message);
  }else{
    Object.keys(
      state.itemCounts
    )
    .filter(
      k=>k.startsWith(cat+':')
    )
    .forEach(
      k=>delete state.itemCounts[k]
    );

    render();

    toast(
      'リセットしました'
    );
  }
}


/* ==================================================
   モーダル
   ================================================== */

function modal(html){
  const m=
    document.createElement('div');

  m.className='modal';

  m.innerHTML=
    `<div class="modal-box">${html}</div>`;

  document.body.appendChild(m);

  return m;
}


/* ==================================================
   設定
   ================================================== */

function quickSettings(){
  const colors=[
    {name:'サーモンピンク（デフォルト）',value:'#e98f8f'},
    {name:'ピンク',value:'#f16cb0'},
    {name:'ラベンダー',value:'#b9a0f2'},
    {name:'ミントグリーン',value:'#62d1bf'},
    {name:'ブルー',value:'#69b3f5'},
    {name:'イエロー',value:'#ffd879'},
    {name:'オレンジ',value:'#f9aa57'},
    {name:'レッド',value:'#f05261'},
    {name:'パープル',value:'#9674c9'},
    {name:'スカイブルー',value:'#65c5e8'},
    {name:'グリーン',value:'#71d17d'},
    {name:'ネイビー',value:'#49658d'},
    {name:'グレー',value:'#a5a5a5'}
  ];

  const m=modal(`
    <div class="section-head">
      <h2>🎨 ボタンカラー</h2>
      <button class="iconbtn" id="x" aria-label="閉じる">×</button>
    </div>

    <p class="muted">
      ボタン・アクセント・進捗バーなどの色を変更できます。背景色はここでは変更しません。
    </p>

    <div class="swatches swatches-named" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px 10px;margin:18px 0 22px">
      ${colors.map(c=>`
        <button type="button"
          class="swatch-choice"
          data-color="${c.value}"
          aria-label="${c.name}"
          aria-pressed="${state.accentColor===c.value}"
          style="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:7px;min-width:0;border:0;background:transparent;padding:4px;color:var(--text,#332b35);cursor:pointer">
          <span class="swatch ${state.accentColor===c.value?'active':''}"
            style="display:block;width:48px;height:48px;max-width:100%;border-radius:16px;background:${c.value};border:${state.accentColor===c.value?'3px solid var(--text,#332b35)':'2px solid transparent'};box-sizing:border-box;flex-shrink:0"></span>
          <span style="font-size:12px;line-height:1.35;text-align:center;overflow-wrap:anywhere">${c.name}</span>
        </button>
      `).join('')}
    </div>

    <div class="form" style="margin-top:12px;border-top:1px solid var(--line,#f0d7dd);padding-top:16px">
      <label for="customColor" style="display:block;font-weight:700;margin-bottom:8px">🌈 カスタムカラー（自由設定）</label>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <input id="customColor" type="color" value="${state.accentColor}" aria-label="カスタムカラーを選ぶ"
          style="width:64px;height:48px;padding:4px;border:1px solid var(--line,#f0d7dd);border-radius:12px;background:var(--card,#fff);cursor:pointer">
        <span class="muted" style="font-size:13px">色を自由に選んで、下のボタンで保存できます。</span>
      </div>
      <button class="primary" id="saveColor" style="width:100%;margin-top:12px">この色を保存</button>
    </div>
  `);

  m.querySelector('#x').onclick=()=>m.remove();
  m.querySelectorAll('[data-color]').forEach(b=>{
    b.onclick=()=>saveTheme(b.dataset.color,m);
  });
  m.querySelector('#saveColor').onclick=()=>saveTheme(m.querySelector('#customColor').value,m);
}

async function saveTheme(
  color,
  m
){
  const {error}=
    await sb
      .from('profiles')
      .update({
        accent_color:color,
        updated_at:new Date().toISOString()
      })
      .eq('id',state.user.id);

  if(error){
    toast(error.message);
  }else{
    state.accentColor=color;

    applyTheme();

    m.remove();

    toast(
      'ボタンカラーを保存しました'
    );

    render();
  }
}

function giftManager(){
  const m=modal(`
    <div class="section-head">

      <h2>
        🎁 ギフト管理
      </h2>

      <button
        class="iconbtn"
        id="x"
      >
        ×
      </button>

    </div>

    <p class="muted">
      ギフト名とコイン数を登録すると、
      コイン数ごとの欄に自動で表示されます。
    </p>

    <div class="form">

      <label>
        ギフト名
      </label>

      <input
        id="gn"
        placeholder="例：ハート"
      >

      <label>
        コイン数
      </label>

      <input
        id="gc"
        type="number"
        min="1"
        placeholder="5"
      >

      <label>
        絵文字
      </label>

      <input
        id="ge"
        maxlength="2"
        placeholder="💗"
      >

      <label>
        目標個数（このギフトの目安）
      </label>

      <input
        id="gt"
        type="number"
        min="1"
        value="10"
      >

      <button
        class="primary"
        id="addGift"
      >
        登録する
      </button>

    </div>

    <div
      style="margin-top:18px"
      class="list"
    >
      ${
        state.gifts
          .filter(
            g=>!String(g.id).startsWith('demo-')
          )
          .map(
            g=>`
              <div class="item">

                <span>
                  ${esc(g.emoji||'🎁')}
                  ${esc(g.name)}
                  <span class="pill">
                    ${g.coin}C
                  </span>
                </span>

                <button
                  class="danger"
                  data-del-gift="${g.id}"
                >
                  削除
                </button>

              </div>
            `
          ).join('')
      }
    </div>
  `);

  m.querySelector('#x').onclick=
    ()=>m.remove();

  m.querySelector('#addGift').onclick=
    async()=>{
      const name=
        m.querySelector('#gn')
          .value
          .trim();

      const coin=
        Number(
          m.querySelector('#gc').value
        );

      const emoji=
        m.querySelector('#ge')
          .value
          .trim()||'🎁';

      const target=
        Number(
          m.querySelector('#gt').value
        )||10;

      if(!name||!coin){
        return toast(
          'ギフト名とコイン数を入力してください'
        );
      }

      const {error}=
        await sb
          .from('gift_definitions')
          .insert({
            user_id:state.appUserId,
            name,
            coin,
            emoji,
            target
          });

      if(error){
        toast(error.message);
      }else{
        m.remove();

        await load();

        toast(
          'ギフトを登録しました'
        );
      }
    };

  m.querySelectorAll(
    '[data-del-gift]'
  ).forEach(
    b=>b.onclick=async()=>{
      if(
        !confirm(
          'このギフトを削除しますか？'
        )
      ){
        return;
      }

      await sb
        .from('gift_definitions')
        .delete()
        .eq(
          'id',
          b.dataset.delGift
        );

      m.remove();

      await load();
    }
  );
}

function customManager(project){
  const items=
    Object.values(
      state.customItems||{}
    )
    .filter(
      i=>i.project_id===project.id
    )
    .sort(
      (a,b)=>
        (a.sort_order||0)-
        (b.sort_order||0)
    );

  const m=modal(`
    <div class="section-head">

      <h2>
        ✨ ${esc(project.name)}
      </h2>

      <button
        class="iconbtn"
        id="x"
        type="button"
      >
        ×
      </button>

    </div>

    <p class="muted">
      項目をタップすると＋1。
      項目の追加・削除もできます。
    </p>

    <div
      class="form"
      style="margin-bottom:14px"
    >

      <input
        id="newCustomItemName"
        placeholder="例：おにぎり"
      >

      <button
        class="primary"
        id="addCustomItem"
        type="button"
      >
        ＋ 項目を追加
      </button>

    </div>

    <div
      class="choice-grid"
      id="customItems"
    >

      ${
        items.length
          ? items.map(
              item=>{
                const count=
                  Number(
                    state.itemCounts[
                      `custom:${project.id}:${item.id}`
                    ]||0
                  );

                return `
                  <div class="origift-card">

                    <button
                      class="choice-btn ${count>0?'checked':''}"
                      data-custom-item="${item.id}"
                      type="button"
                    >

                      <strong>
                        ${esc(item.name)}
                      </strong>

                      <span>
                        ${count}回
                      </span>

                    </button>

                    <button
                      class="danger small-btn"
                      data-del-custom-item="${item.id}"
                      type="button"
                    >
                      削除
                    </button>

                  </div>
                `;
              }
            ).join('')
          : `
            <div class="empty">
              まだ項目がありません。
            </div>
          `
      }

    </div>

    <div
      class="coin-head"
      style="margin-top:14px"
    >

      <span class="counterline">
        目標 ${Number(project.goal)||0}
      </span>

      <div class="row">

        <button
          class="danger"
          id="resetCustomProject"
          type="button"
        >
          リセット
        </button>

        <button
          class="danger"
          id="deleteCustomProject"
          type="button"
        >
          この耐久を削除
        </button>

      </div>

    </div>
  `);

  m.querySelector('#x').onclick=
    ()=>{
      m.remove();
    };

  m.querySelector(
    '#addCustomItem'
  ).onclick=async()=>{
    const input=
      m.querySelector(
        '#newCustomItemName'
      );

    const name=
      input.value.trim();

    if(!name){
      toast(
        '項目名を入力してください'
      );
      return;
    }

    const {error}=
      await sb
        .from('custom_items')
        .insert({
          user_id:state.appUserId,
          project_id:project.id,
          name,
          sort_order:items.length
        });

    if(error){
      toast(error.message);
      return;
    }

    await load();

    m.remove();

    const updatedProject=
      state.customProjects.find(
        p=>p.id===project.id
      );

    if(updatedProject){
      customManager(updatedProject);
    }

    toast(
      '項目を追加しました'
    );
  };

  m.querySelectorAll(
    '[data-custom-item]'
  ).forEach(
    b=>{
      b.onclick=async()=>{
        const itemId=
          b.dataset.customItem;

        const key=
          `custom:${project.id}:${itemId}`;

        const next=
          Number(
            state.itemCounts[key]||0
          )+1;

        const {error}=
          await sb
            .from('endurance_item_counts')
            .upsert(
              {
                user_id:state.appUserId,
                category:`custom:${project.id}`,
                item_key:itemId,
                count:next,
                updated_at:new Date().toISOString()
              },
              {
                onConflict:
                  'user_id,category,item_key'
              }
            );

        if(error){
          toast(error.message);
          return;
        }

        state.itemCounts[key]=next;

        const countSpan=
          b.querySelector('span');

        if(countSpan){
          countSpan.textContent=
            `${next}回`;
        }

        b.classList.add(
          'checked'
        );
      };
    }
  );

  m.querySelectorAll(
    '[data-del-custom-item]'
  ).forEach(
    b=>{
      b.onclick=async()=>{
        if(
          !confirm(
            'この項目を削除しますか？'
          )
        ){
          return;
        }

        const itemId=
          b.dataset.delCustomItem;

        await sb
          .from('endurance_item_counts')
          .delete()
          .eq(
            'user_id',
            state.appUserId
          )
          .eq(
            'category',
            `custom:${project.id}`
          )
          .eq(
            'item_key',
            itemId
          );

        await sb
          .from('custom_items')
          .delete()
          .eq(
            'id',
            itemId
          )
          .eq(
            'user_id',
            state.appUserId
          );

        await load();

        m.remove();

        const updatedProject=
          state.customProjects.find(
            p=>p.id===project.id
          );

        if(updatedProject){
          customManager(
            updatedProject
          );
        }
      };
    }
  );

  m.querySelector(
    '#resetCustomProject'
  ).onclick=async()=>{
    if(
      !confirm(
        'このカスタム耐久のカウントをリセットしますか？'
      )
    ){
      return;
    }

    await sb
      .from('endurance_item_counts')
      .delete()
      .eq(
        'user_id',
        state.appUserId
      )
      .eq(
        'category',
        `custom:${project.id}`
      );

    Object.keys(
      state.itemCounts
    )
    .filter(
      k=>
        k.startsWith(
          `custom:${project.id}:`
        )
    )
    .forEach(
      k=>delete state.itemCounts[k]
    );

    m.remove();

    customManager(project);

    toast(
      'カスタム耐久をリセットしました'
    );
  };

  m.querySelector(
    '#deleteCustomProject'
  ).onclick=async()=>{
    m.remove();
    await deleteCustomProject(project);
  };

  return m;
}


async function deleteCustomProject(project){
  if(!sb||!state.appUserId||!project?.id)return;

  if(!confirm(
    `「${project.name}」を削除しますか？\n\n`+
    'この耐久と、登録されている項目・各項目のカウントをすべて削除します。\n'+
    'この操作は元に戻せません。'
  )){
    return;
  }

  try{
    const projectId=project.id;
    const category=`custom:${projectId}`;

    const {error:countError}=await sb
      .from('endurance_item_counts')
      .delete()
      .eq('user_id',state.appUserId)
      .eq('category',category);
    if(countError)throw countError;

    const {error:itemError}=await sb
      .from('custom_items')
      .delete()
      .eq('user_id',state.appUserId)
      .eq('project_id',projectId);
    if(itemError)throw itemError;

    const {error:projectError}=await sb
      .from('endurance_projects')
      .delete()
      .eq('user_id',state.appUserId)
      .eq('id',projectId)
      .in('type',['custom','custom_types']);
    if(projectError)throw projectError;

    Object.keys(state.itemCounts||{})
      .filter(key=>key.startsWith(`${category}:`))
      .forEach(key=>delete state.itemCounts[key]);

    state.customProjects=state.customProjects.filter(
      p=>String(p.id)!==String(projectId)
    );

    Object.keys(state.customItems||{})
      .filter(key=>key.startsWith(`${projectId}:`))
      .forEach(key=>delete state.customItems[key]);

    render();
    toast(`「${project.name}」を削除しました`);
  }catch(error){
    console.error('カスタム耐久削除エラー:',error);
    toast(`カスタム耐久の削除に失敗しました：${error?.message||error}`);
  }
}

function newCustom(){
  const templates={
    gojuon:{name:'五十音耐久',mode:'types',goal:46,items:['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん']},
    blood:{name:'血液型耐久',mode:'types',goal:4,items:['A型','B型','O型','AB型']},
    birthday:{name:'誕生月耐久',mode:'types',goal:12,items:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']}
  };
  const m=modal(`
    <div class="section-head"><h2>✨ カスタム耐久を作成</h2><button class="iconbtn" id="cancel" type="button">×</button></div>
    <p class="top-note">テンプレートから選ぶか、自由に作成できます。</p>
    <div class="custom-template-list">
      <button type="button" class="custom-template-option" data-template="gojuon"><strong>あ　五十音耐久</strong><small>あ〜ん・46種類を集める</small></button>
      <button type="button" class="custom-template-option" data-template="blood"><strong>🩸 血液型耐久</strong><small>A型・B型・O型・AB型</small></button>
      <button type="button" class="custom-template-option" data-template="birthday"><strong>📅 誕生月耐久</strong><small>1月〜12月・12種類</small></button>
    </div>
    <div class="custom-free-create">
      <h3>自由に作成</h3>
      <div class="form">
        <label>耐久名</label><input id="pn" placeholder="例：好きなラーメンの味">
        <label>目標の種類</label>
        <div class="custom-goal-mode-options">
          <label class="custom-goal-mode-option"><input type="radio" name="customGoalMode" value="count" checked> 目標数集める（回数）</label>
          <label class="custom-goal-mode-option"><input type="radio" name="customGoalMode" value="types"> 目標種類集める（種類）</label>
        </div>
        <label id="customGoalLabel">目標数</label><input id="pg" type="number" min="1" value="50">
        <button class="primary" id="ok" type="button">自由に作成</button>
      </div>
    </div>
  `);
  const close=()=>m.remove();
  m.querySelector('#cancel').onclick=close;
  m.querySelectorAll('input[name="customGoalMode"]').forEach(radio=>radio.addEventListener('change',()=>{
    const types=m.querySelector('input[name="customGoalMode"]:checked')?.value==='types';
    m.querySelector('#customGoalLabel').textContent=types?'目標種類数':'目標数';
    m.querySelector('#pg').value=types?'46':'50';
  }));
  async function createProject(name,mode,goal,items=[]){
    if(!sb){toast('保存するにはログインが必要です');return;}
    const {data:project,error}=await sb.from('endurance_projects').insert({user_id:state.appUserId,type:'custom',goal_mode:mode,name,goal,current:0}).select('*').single();
    if(error){toast(error.message);return;}
    if(items.length){
      const rows=items.map((item,index)=>({user_id:state.appUserId,project_id:project.id,name:item,sort_order:index}));
      const {error:itemError}=await sb.from('custom_items').insert(rows);
      if(itemError){toast(`耐久は作成されましたが、項目の登録に失敗しました：${itemError.message}`);await load();close();return;}
    }
    close();await load();
    toast(`「${name}」を作成しました`);
  }
  m.querySelectorAll('[data-template]').forEach(button=>button.addEventListener('click',async()=>{
    const t=templates[button.dataset.template];
    button.disabled=true;
    await createProject(t.name,t.mode,t.goal,t.items);
  }));
  m.querySelector('#ok').onclick=async()=>{
    const name=m.querySelector('#pn').value.trim();
    if(!name){toast('耐久名を入力してください');return;}
    const mode=m.querySelector('input[name="customGoalMode"]:checked')?.value||'count';
    const goal=Math.max(1,Number(m.querySelector('#pg').value)||(mode==='types'?46:50));
    m.querySelector('#ok').disabled=true;
    await createProject(name,mode,goal);
  };
}

async function saveThemeMode(mode){
  const {error}=
    await sb
      .from('profiles')
      .update({
        theme_mode:mode,
        updated_at:new Date().toISOString()
      })
      .eq(
        'id',
        state.user.id
      );

  if(error){
    toast(error.message);
  }else{
    state.themeMode=mode;

    applyTheme();

    render();

    toast(
      mode==='dark'
        ? 'ダークモードにしました'
        : 'ホワイトモードにしました'
    );
  }
}


/* ==================================================
   イベント・ボタン処理
   ================================================== */

function bind(){

  document
    .querySelectorAll('.tabs button')
    .forEach(
      b=>{
        b.onclick=()=>{
          state.tab=
            b.dataset.tab;

          render();
        };
      }
    );

  document
    .querySelectorAll('[data-jump]')
    .forEach(
      b=>{
        b.onclick=()=>{
          state.tab=
            b.dataset.jump;

          render();
        };
      }
    );

  if(state.tab==='entry'){
    bindEntryEndurance();
  }

  $('#reloadAppBtn')?.addEventListener(
    'click',
    ()=>{
      window.location.reload();
    }
  );

  $('#quickReloadBtn')?.addEventListener(
    'click',
    ()=>window.location.reload()
  );

  $('#quickSettings')?.addEventListener(
    'click',
    quickSettings
  );

  $('#openAppearance')?.addEventListener(
    'click',
    quickSettings
  );

  $('#saveDisplayName')?.addEventListener(
    'click',
    async()=>{
      const input=
        $('#newDisplayName');

      if(!input)return;

      const name=
        input.value.trim();

      if(!name){
        toast(
          'ユーザー名を入力してください'
        );
        return;
      }

      if(name.length>30){
        toast(
          'ユーザー名は30文字以内にしてください'
        );
        return;
      }

      const {error}=
        await sb
          .from('profiles')
          .update({
            display_name:name,
            updated_at:new Date().toISOString()
          })
          .eq(
            'id',
            state.user.id
          );

      if(error){
        console.error(error);
        toast(error.message);
        return;
      }

      state.profile=
        state.profile||{};

      state.profile.display_name=
        name;

      toast(
        'ユーザー名を変更しました'
      );

      render();
    }
  );

  document
    .querySelectorAll(
      '[data-theme-mode]'
    )
    .forEach(
      b=>{
        b.onclick=()=>{
          saveThemeMode(
            b.dataset.themeMode
          );
        };
      }
    );

  $('#startNewUser')?.addEventListener(
    'click',
    startNewUser
  );

  $('#takeoverUser')?.addEventListener(
    'click',
    takeoverUser
  );

  $('#logout')?.addEventListener(
    'click',
    signOut
  );

  $('#copyUserCode')?.addEventListener(
    'click',
    async()=>{
      const code=
        state.appUser?.user_code;

      if(!code)return;

      try{
        await navigator.clipboard.writeText(
          code
        );

        toast(
          'ユーザーコードをコピーしました'
        );

      }catch(error){
        console.error(error);

        prompt(
          'ユーザーコードをコピーしてください',
          code
        );
      }
    }
  );

  document
    .querySelectorAll('[data-gift]')
    .forEach(
      b=>{
        b.onclick=()=>{
          incrementGift(
            b.dataset.gift
          );
        };
      }
    );

  document
    .querySelectorAll('[data-gift-minus]')
    .forEach(b=>{
      b.onclick=()=>decrementGift(b.dataset.giftMinus);
    });

  document
    .querySelectorAll('[data-reset-gift]')
    .forEach(b=>{
      b.onclick=()=>resetSingleGift(b.dataset.resetGift);
    });

  document
    .querySelectorAll('[data-reset-coin]')
    .forEach(
      b=>{
        b.onclick=()=>{
          resetCoin(
            b.dataset.resetCoin
          );
        };
      }
    );

  document
    .querySelectorAll('[data-item-cat]')
    .forEach(
      b=>{
        b.onclick=()=>{
          incrementItem(
            b.dataset.itemCat,
            b.dataset.itemKey
          );
        };
      }
    );

  document
    .querySelectorAll('[data-item-minus-cat]')
    .forEach(b=>{
      b.onclick=()=>decrementItem(
        b.dataset.itemMinusCat,
        b.dataset.itemMinusKey
      );
    });

  document
    .querySelectorAll('[data-item-plus-cat]')
    .forEach(b=>{
      b.onclick=()=>incrementItem(
        b.dataset.itemPlusCat,
        b.dataset.itemPlusKey
      );
    });

  document
    .querySelectorAll(
      '[data-reset-category]'
    )
    .forEach(
      b=>{
        b.onclick=()=>{
          resetCategory(
            b.dataset.resetCategory
          );
        };
      }
    );

  $('#eventSettings')?.addEventListener(
    'click',
    eventSettingsModal
  );
  $('#showGiftCollection')?.addEventListener('click',()=>{state.giftViewMode='collect';render();});
  $('#showMiniGifts')?.addEventListener('click',()=>{state.giftViewMode='mini';render();});
  $('#showAllGiftEndurance')?.addEventListener('click',()=>{state.giftViewMode='all';render();});
  $('#addGiftCollectionGoal')?.addEventListener('click',addGiftCollectionGoal);
  $('#resetGiftCollectionGoals')?.addEventListener('click',()=>{if(confirm('ギフト集めの目標をすべて削除しますか？')){saveGiftCollectionGoals([]);render();}});
  document.querySelectorAll('[data-remove-collection-goal]').forEach(b=>b.addEventListener('click',()=>{const goals=getGiftCollectionGoals();goals.splice(Number(b.dataset.removeCollectionGoal),1);saveGiftCollectionGoals(goals);render();}));
  document.querySelectorAll('[data-collection-plus]').forEach(b=>b.addEventListener('click',()=>incrementGift(b.dataset.collectionPlus)));
  document.querySelectorAll('[data-collection-minus]').forEach(b=>b.addEventListener('click',()=>decrementGift(b.dataset.collectionMinus)));

  $('#resetAllGifts')?.addEventListener('click',resetAllGifts);
  $('#toggleSeasonGiftEndurance')?.addEventListener('click',toggleSeasonGiftEndurance);

  document
    .querySelectorAll(
      '[data-reset-source]'
    )
    .forEach(
      b=>{
        b.onclick=()=>{
          resetCoin(
            b.dataset.resetCoin,
            'official'
          );
        };
      }
    );

  document
    .querySelectorAll(
      '[data-reset-event]'
    )
    .forEach(
      b=>{
        b.onclick=()=>{
          resetEvent(
            b.dataset.resetEvent
          );
        };
      }
    );

  $('#newOrigift')?.addEventListener(
    'click',
    newOrigift
  );

  document.querySelectorAll('[data-origift-plus]').forEach(b=>{
    b.addEventListener('click',()=>incrementGift(b.dataset.origiftPlus));
  });
  document.querySelectorAll('[data-origift-minus]').forEach(b=>{
    b.addEventListener('click',()=>decrementGift(b.dataset.origiftMinus));
  });

  document.querySelectorAll('[data-edit-origift]').forEach(b=>{
    b.addEventListener('click',()=>origiftImagePicker(b.dataset.editOrigift));
  });
  document.querySelectorAll('[data-edit-origift-image]').forEach(b=>{
    b.addEventListener('click',()=>origiftImagePicker(b.dataset.editOrigiftImage));
  });

  document
    .querySelectorAll(
      '[data-del-origift]'
    )
    .forEach(
      b=>{
        b.onclick=async()=>{
          if(
            !confirm(
              'このオリギフを削除しますか？'
            )
          ){
            return;
          }

          await sb
            .from('gift_definitions')
            .delete()
            .eq(
              'id',
              b.dataset.delOrigift
            )
            .eq(
              'user_id',
              state.appUserId
            );
          setOrigiftImage(b.dataset.delOrigift,'');

          await load();
        };
      }
    );

  document.querySelectorAll('[data-add-origift-target]').forEach(b=>{
    b.addEventListener('click',()=>addOrigiftToEndurance(b.dataset.addOrigiftTarget));
  });
  document.querySelectorAll('[data-remove-origift-target]').forEach(b=>{
    b.addEventListener('click',()=>removeOrigiftFromEndurance(b.dataset.removeOrigiftTarget));
  });

  $('#resetOrigiftEndurance')?.addEventListener('click',async()=>{
    const targets=getOrigiftEnduranceTargets();
    const ids=Object.keys(targets);
    if(!ids.length){toast('耐久対象のギフトがありません');return;}
    if(!confirm('オリギフ耐久の対象ギフトのカウントをすべて0に戻しますか？'))return;
    const {error}=await sb.from('gift_counts')
      .delete()
      .eq('user_id',state.appUserId)
      .in('gift_id',ids);
    if(error){toast('リセットできませんでした：'+error.message);return;}
    await load();
    toast('オリギフ耐久をリセットしました');
  });

  $('#newCustom')?.addEventListener(
    'click',
    newCustom
  );

  document.querySelectorAll('[data-select-custom]').forEach(b=>{
    b.onclick=()=>{
      state.activeCustomProjectId=b.dataset.selectCustom;
      render();
    };
  });

  async function updateCustomCount(projectId,itemId,delta){
    const project=state.customProjects.find(p=>String(p.id)===String(projectId));
    if(!project)return;
    const key=`custom:${projectId}:${itemId}`;
    const next=Math.max(0,Number(state.itemCounts[key]||0)+delta);
    const {error}=await sb.from('endurance_item_counts').upsert({
      user_id:state.appUserId,
      category:`custom:${projectId}`,
      item_key:String(itemId),
      count:next,
      updated_at:new Date().toISOString()
    },{onConflict:'user_id,category,item_key'});
    if(error){toast('カウントを保存できませんでした：'+error.message);return;}
    state.itemCounts[key]=next;
    render();
  }

  document.querySelectorAll('[data-custom-count-plus]').forEach(b=>{
    b.onclick=()=>updateCustomCount(b.dataset.customProject,b.dataset.customCountPlus,1);
  });
  document.querySelectorAll('[data-custom-count-minus]').forEach(b=>{
    b.onclick=()=>updateCustomCount(b.dataset.customProject,b.dataset.customCountMinus,-1);
  });
  document.querySelectorAll('[data-reset-custom]').forEach(b=>{
    b.onclick=async()=>{
      const project=state.customProjects.find(p=>String(p.id)===String(b.dataset.resetCustom));
      if(!project||!confirm(`「${project.name}」のカウントをすべて0に戻しますか？`))return;
      const {error}=await sb.from('endurance_item_counts').delete()
        .eq('user_id',state.appUserId).eq('category',`custom:${project.id}`);
      if(error){toast('リセットできませんでした：'+error.message);return;}
      Object.keys(state.itemCounts).filter(k=>k.startsWith(`custom:${project.id}:`)).forEach(k=>delete state.itemCounts[k]);
      render();
      toast(`「${project.name}」をリセットしました`);
    };
  });

  document
    .querySelectorAll(
      '[data-manage-custom]'
    )
    .forEach(
      b=>{
        b.onclick=()=>{
          const project=
            state.customProjects.find(
              p=>
                String(p.id)===
                String(b.dataset.manageCustom)
            );

          if(project){
            customManager(project);
          }
        };
      }
    );

  document
    .querySelectorAll(
      '[data-delete-custom]'
    )
    .forEach(
      b=>{
        b.onclick=async()=>{
          const project=
            state.customProjects.find(
              p=>
                String(p.id)===
                String(b.dataset.deleteCustom)
            );

          if(project){
            await deleteCustomProject(project);
          }
        };
      }
    );
}


/* ==================================================
   Supabase起動
   ================================================== */

// 認証操作（新規作成・ログイン・引き継ぎ）は各処理で load() を実行する。
// onAuthStateChange からも load() すると同じ初期化が重複実行され、
// 公式ギフト準備が複数回走ってエラー画面が重なることがあるため、
// ここでは自動ロードを行わない。
applyTheme();
load();

/* Theme color fix: gift endurance and collection UI follows the chosen accent on desktop and mobile. */
(function installGiftThemeColorFix(){
  const id='avvy-gift-theme-color-fix';
  if(document.getElementById(id)) return;
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    .gift-ui{--gift-pink:var(--primary);--gift-pink-dark:var(--accent-ink);--gift-pink-soft:var(--accent-soft);--gift-pink-line:var(--line);}
    .gift-ui.gift-endurance,.gift-ui.gift-collection{background:var(--surface)!important;border-color:var(--line)!important;}
    .gift-ui .coin-group,.gift-ui .event-group{background:linear-gradient(180deg,var(--surface),var(--accent-soft))!important;border-color:var(--line)!important;}
    .gift-ui .gift-category,.gift-ui .mascot-group,.gift-ui .event-coin{background:var(--accent-soft)!important;border-color:var(--line)!important;}
    .gift-ui .gift-card,.gift-ui .gift-card.is-unachieved{background:var(--surface)!important;border-color:var(--line)!important;}
    .gift-ui .gift-card.is-achieved{background:linear-gradient(180deg,var(--surface),var(--accent-soft))!important;border-color:var(--primary)!important;}
    .gift-ui .target-summary,.gift-ui .collection-goal{background:linear-gradient(135deg,var(--accent-soft),var(--surface))!important;border-color:var(--line)!important;}
    .gift-ui .progress{background:var(--soft)!important;}
    .gift-ui .progress i{background:linear-gradient(90deg,var(--primary2),var(--primary))!important;}
    .gift-ui .gift-counter-plus,.gift-ui .gift-btn[data-gift-plus],.gift-ui [data-collection-plus]{background:var(--primary)!important;border-color:var(--primary)!important;box-shadow:0 3px 0 var(--accent-ink)!important;}
    .gift-ui .gift-counter-minus,.gift-ui [data-gift-minus],.gift-ui [data-collection-minus]{background:var(--surface)!important;border-color:var(--line)!important;color:var(--accent-ink)!important;}
    .gift-ui .gift-btn,.gift-ui .pill{background:var(--accent-soft)!important;border-color:var(--line)!important;color:var(--accent-ink)!important;}
    .gift-ui .complete-badge,.gift-ui .gift-card.is-achieved::before{background:var(--accent-soft)!important;color:var(--accent-ink)!important;}
    html[data-theme="dark"] .gift-ui .gift-card,
    html[data-theme="dark"] .gift-ui .coin-group,
    html[data-theme="dark"] .gift-ui .event-group,
    html[data-theme="dark"] .gift-ui .gift-category,
    html[data-theme="dark"] .gift-ui .mascot-group,
    html[data-theme="dark"] .gift-ui .target-summary,
    html[data-theme="dark"] .gift-ui .collection-goal{background:var(--surface)!important;color:var(--text)!important;}
  `;
  document.head.appendChild(style);
})();
/* Gift card layout: explicit title/image/count order; one-line names; compact 3-column mobile grid. */
(function installGiftCardLayoutFinalFix(){
  const id='avvy-gift-card-layout-final-fix';
  if(document.getElementById(id)) return;
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    .gift-ui .gift-card{
      display:flex!important;
      flex-direction:column!important;
      align-items:stretch!important;
      min-width:0!important;
      gap:8px!important;
    }
    .gift-ui .gift-card .gift-status{
      align-self:flex-start;
      order:0;
      font-size:.78em;
      line-height:1.3;
    }
    .gift-ui .gift-card .gift-title{
      display:block!important;
      order:1;
      width:100%;
      min-width:0;
      margin:0;
      padding:0 2px;
      text-align:center;
      white-space:nowrap!important;
      overflow:hidden!important;
      text-overflow:ellipsis!important;
      overflow-wrap:normal!important;
      word-break:normal!important;
      line-height:1.35!important;
    }
    .gift-ui .gift-card .gift-card-image{
      order:2;
      display:block!important;
      position:static!important;
      inset:auto!important;
      transform:none!important;
      width:100%!important;
      max-width:100%!important;
      height:clamp(90px, 16vw, 165px)!important;
      min-height:0!important;
      max-height:none!important;
      object-fit:contain!important;
      object-position:center!important;
      margin:0 auto!important;
      flex:0 0 auto!important;
    }
    .gift-ui .gift-card .gift-count{
      order:3;
      display:block;
      width:100%;
      text-align:center;
      line-height:1.3;
      font-weight:700;
    }
    .gift-ui .gift-card .gift-counter-controls{
      order:4;
      position:static!important;
      inset:auto!important;
      transform:none!important;
      display:grid!important;
      grid-template-columns:1fr 1fr!important;
      gap:6px!important;
      margin-top:2px!important;
    }
    @media(max-width:600px){
      .gift-ui .gift-grid{
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:8px!important;
      }
      .gift-ui .gift-card{
        padding:7px!important;
        gap:6px!important;
      }
      .gift-ui .gift-card .gift-title{
        font-size:clamp(10px,3.1vw,13px)!important;
      }
      .gift-ui .gift-card .gift-card-image{
        height:clamp(64px,20vw,100px)!important;
      }
      .gift-ui .gift-card .gift-count{
        font-size:clamp(11px,3.2vw,14px)!important;
      }
      .gift-ui .gift-card .gift-counter-btn{
        min-width:0!important;
        padding:5px 2px!important;
        font-size:13px!important;
      }
      .gift-ui .gift-card .gift-counter-btn small{
        display:inline!important;
        font-size:10px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* Fix duplicated status labels and keep gift names on one line in 3-column mobile cards. */
(function installGiftCardStatusAndTitleFix(){
  const id='avvy-gift-card-status-title-fix';
  if(document.getElementById(id)) return;
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    .gift-ui .gift-card.is-achieved::before,
    .gift-ui .gift-card.is-unachieved::before{
      content:none!important;
      display:none!important;
    }
    .gift-ui .gift-card .gift-status{display:inline-flex!important}
    .gift-ui .gift-card .gift-title{
      white-space:nowrap!important;
      overflow:hidden!important;
      text-overflow:clip!important;
      overflow-wrap:normal!important;
      word-break:keep-all!important;
      font-size:clamp(10px,1.1vw,15px)!important;
      letter-spacing:-.035em!important;
    }
    @media(max-width:600px){
      .gift-ui .gift-card .gift-title{
        font-size:clamp(9px,2.7vw,12px)!important;
        letter-spacing:-.045em!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
/* Avvy cleanup: remove stale plain-text duplicate status labels; keep the grey badge. */
(function installDuplicateStatusTextCleanup(){
  const clean=()=>{
    document.querySelectorAll('.gift-card .gift-title').forEach(el=>{
      if(String(el.textContent||'').trim()==='未達成') el.remove();
    });
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',clean,{once:true});
  clean();
  const root=document.querySelector('#app, #root, main');
  if(root && typeof MutationObserver!=='undefined'){
    const observer=new MutationObserver(clean);
    observer.observe(root,{childList:true,subtree:true});
  }
})();

