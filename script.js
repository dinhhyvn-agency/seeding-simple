const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>reveal.observe(e));
const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('nav a')];
function updateNav(){const current=[...sections].reverse().find(s=>s.getBoundingClientRect().top<=160);links.forEach(a=>a.classList.toggle('active',current&&a.hash===`#${current.id}`))}
window.addEventListener('scroll',updateNav,{passive:true});updateNav();
document.getElementById('backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const featureContent={
profiles:{label:'Gắn hồ sơ với nhóm',window:'Hồ sơ, nhóm & thư mục Chrome',title:'Giữ mỗi danh tính gắn đúng nơi đăng.',description:'Gắn cho mỗi hồ sơ một thư mục dữ liệu Chrome riêng, một nhóm Facebook và một thư mục ảnh.',proofs:['Mỗi hồ sơ gắn với đúng một nhóm dự định','Thư mục Chrome riêng giúp các phiên không chồng lấn','Trạng thái mở thử cho thấy lỗi đăng nhập hoặc checkpoint'],demo:()=>`<div class="metric-row"><div><small>Hồ sơ</small><strong>3</strong></div><div><small>Sẵn sàng</small><strong class="teal">2</strong></div><div><small>Cần xử lý</small><strong class="amber">1</strong></div></div><div class="table-card"><div class="table-head"><span>Hồ sơ</span><span>Nơi đăng</span><span>Thư mục trình duyệt</span><span>Trạng thái</span></div>${[['MH','Maya Home','Minimal Home Living','Chrome / Maya','Sẵn sàng'],['AD','Alex Daily','Coffee Lovers Club','Chrome / Alex','Sẵn sàng'],['SN','Studio North','Modern Interiors','Chrome / Studio','Checkpoint']].map((p,i)=>`<div class="table-row demo-step"><span class="profile-cell"><b class="avatar a${i}">${p[0]}</b><em>${p[1]}</em></span><span>${p[2]}</span><span class="mono">${p[3]}</span><span><i class="status ${p[4]==='Sẵn sàng'?'ok':'warn'}">${p[4]}</i></span></div>`).join('')}</div><div class="activity"><b>Kiểm tra liên kết</b><div class="demo-step"><i>1</i><span>Đã phát hiện thư mục hồ sơ riêng</span><time>3 / 3</time></div><div class="demo-step"><i>2</i><span>Đã xác minh quyền vào nơi đăng</span><time>2 / 3</time></div></div>`},
sheets:{label:'Nhận nội dung từ Google Sheet',window:'Nguồn nội dung & kiểm tra',title:'Biến kế hoạch nội dung chung thành việc đã kiểm tra.',description:'Nhập các dòng có cấu trúc từ Google Sheet đã xuất bản và báo lỗi từng dòng trước khi vào hàng đợi.',proofs:['Các cột nội dung, bình luận, ảnh, ngày và giờ','Đồng bộ không tạo bản trùng','Kiểm tra rõ ràng hồ sơ, URL, lịch đăng và file'],demo:()=>`<div class="sync-flow"><span>Google Sheet <b>12 dòng</b></span><i>→</i><span>Kiểm tra <b>10 đạt</b></span><i>→</i><span>Hàng đợi duyệt <b>Sẵn sàng</b></span></div><div class="sheet-card"><div class="sheet-row sheet-head"><b>#</b><b>Hồ sơ</b><b>Nội dung bài</b><b>Ảnh</b><b>Lịch đăng</b><b>Kết quả</b></div><div class="sheet-row demo-step"><span>2</span><span>Maya Home</span><span>Thói quen nhỏ, buổi sáng nhẹ nhàng hơn…</span><span>03.jpg</span><span>12/9 · 09:30</span><span><i class="status ok">Hợp lệ</i></span></div><div class="sheet-row demo-step"><span>3</span><span>Alex Daily</span><span>Một tách ngon đổi nhịp cả ngày…</span><span>08.jpg</span><span>12/9 · 11:00</span><span><i class="status ok">Hợp lệ</i></span></div><div class="sheet-row demo-step error"><span>4</span><span>Studio North</span><span>Đường nét ấm, không gian tĩnh…</span><span>—</span><span>12/9 · 14:00</span><span><i class="status warn">Sửa ảnh</i></span></div></div><div class="activity"><b>Hoạt động nhập</b><div class="demo-step"><i>1</i><span>Kiểm tra cấu trúc và trùng lặp</span><time>Đạt</time></div><div class="demo-step"><i>2</i><span>Đã thêm dòng vào hàng đợi duyệt</span><time>10 mới</time></div></div>`},
rules:{label:'Quy tắc ảnh theo hồ sơ',window:'Quy tắc ảnh & trạng thái sẵn sàng',title:'Dùng đúng ảnh cho đúng hồ sơ.',description:'Đặt từ khóa và bộ lọc chất lượng riêng cho từng hồ sơ, để thay đổi chiến lược hình ảnh mà không phải đổi quy trình.',proofs:['Từ khóa ưu tiên và từ khóa loại trừ cho từng hồ sơ','Chế độ khớp nghiêm ngặt hoặc linh hoạt','Lọc ảnh có mặt người, watermark hoặc nhiều chữ'],demo:()=>`<div class="rules-grid"><div class="rule-panel"><label>Hồ sơ</label><div class="select-like"><b class="avatar a0">MH</b><span>Maya Home</span><i>⌄</i></div><label>Từ khóa ưu tiên</label><div class="chips"><span>nội thất tối giản</span><span>nhà tông trung tính</span><button>+</button></div><label>Từ khóa loại trừ</label><div class="chips danger"><span>người</span><span>logo</span><span>chữ đè ảnh</span></div><label>Chế độ khớp</label><div class="toggle-line"><span><b>Khớp nghiêm ngặt</b><small>Bắt buộc có ít nhất một từ khóa ưu tiên</small></span><i class="toggle on"></i></div></div><div class="rule-panel filters"><label>Bộ lọc chất lượng</label><div class="filter demo-step"><span><i>◎</i><b>Loại ảnh có mặt người</b></span><em>Bật</em></div><div class="filter demo-step"><span><i>◇</i><b>Loại ảnh có watermark</b></span><em>Bật</em></div><div class="filter demo-step"><span><i>≡</i><b>Loại ảnh nhiều chữ</b></span><em>Bật</em></div><div class="rule-result demo-step"><i>✓</i><span><b>Bộ quy tắc sẵn sàng</b><small>3 bộ lọc chất lượng · khớp nghiêm ngặt</small></span></div></div></div><div class="activity compact"><b>Xem trước quy tắc</b><div class="demo-step"><i>1</i><span>Đã quét 24 ảnh ứng viên</span><time>0,8 giây</time></div><div class="demo-step"><i>2</i><span>8 ảnh khớp với hồ sơ này</span><time>Sẵn sàng</time></div></div>`},
images:{label:'Pinterest & thư viện máy',window:'Nguồn ảnh & thư viện',title:'Tự động hóa mà vẫn giữ quyền kiểm soát trên máy.',description:'Dùng một hồ sơ trình duyệt Pinterest riêng để tìm ảnh, hoặc chạy hoàn toàn từ thư mục ảnh của khách hàng.',proofs:['Đăng nhập Pinterest thủ công trong hồ sơ Chrome riêng','Chế độ thư mục máy, không cần Pinterest','Phát hiện ảnh trùng và lưu ảnh không ghi đè'],demo:()=>`<div class="source-bar"><span><i class="pin">P</i><b>Tìm ảnh Pinterest</b><small>Hồ sơ riêng · Đã kết nối</small></span><button>Thư viện máy</button></div><div class="candidate-grid"><article class="candidate accepted demo-step"><div><img src="assets/demo-coffee-approved.png" alt="Ảnh cà phê giả lập được chấp nhận"><span class="reason-tag">✓ Chấp nhận</span></div><h4>Cà phê ấm, không có mặt người</h4><p>Khớp từ khóa · Ảnh sạch</p></article><article class="candidate rejected demo-step"><div><img src="assets/demo-coffee-face.png" alt="Ảnh giả lập bị loại vì có mặt người"><span class="reason-tag">× Có mặt người</span></div><h4>Ảnh chân dung đời thường</h4><p>Bị loại theo quy tắc của Maya Home</p></article><article class="candidate rejected demo-step"><div><img src="assets/demo-coffee-watermark.png" alt="Ảnh giả lập bị loại vì có watermark"><span class="reason-tag">× Watermark</span></div><h4>Ảnh cà phê có thương hiệu</h4><p>Bộ lọc chất lượng đã chặn</p></article></div><div class="activity compact"><b>Hoạt động thư viện</b><div class="demo-step"><i>1</i><span>Đã lưu, không ghi đè ảnh gốc</span><time class="mono">Maya Home / 120926 / 03.jpg</time></div><div class="demo-step"><i>2</i><span>Kiểm tra dấu vân ảnh trùng</span><time>Đạt</time></div></div>`},
queue:{label:'Hàng đợi duyệt & lên lịch',window:'Duyệt, phê duyệt & lịch đăng',title:'Đặt bước duyệt của con người giữa nội dung và lúc đăng.',description:'Chuẩn bị bản xem trước, duyệt từng việc hoặc theo nhóm, hẹn giờ đăng, chạy lại khi lỗi và tạm dừng khi cần.',proofs:['Trạng thái rõ ràng: chờ, đang duyệt, đã duyệt, đã đăng','Chạy lại có kiểm soát, giãn cách dần','Tạm dừng toàn bộ khi gặp checkpoint hoặc lỗi đăng nhập'],demo:()=>`<div class="queue-actions"><span><b>Hàng đợi hôm nay</b><small>3 tác vụ giả lập · thao tác thật đang tắt</small></span><button>Duyệt mục đã chọn</button><button class="outline">Tạm dừng hàng đợi</button></div><div class="queue-progress"><span class="done"></span><span class="done"></span><span class="active"></span><span></span><span></span><b>Hoàn tất 2/5 bước kiểm tra</b></div><div class="table-card queue-table"><div class="table-head"><span>Hồ sơ & nội dung</span><span>Ảnh</span><span>Lịch đăng</span><span>Trạng thái</span></div>${[['MH','Maya Home','Thói quen nhỏ, buổi sáng nhẹ nhàng hơn…','03.jpg','09:30','Đã duyệt','ok'],['AD','Alex Daily','Một tách ngon đổi nhịp cả ngày…','08.jpg','11:00','Đang duyệt','review'],['SN','Studio North','Đường nét ấm, không gian tĩnh…','12.jpg','14:00','Bị chặn','warn']].map((p,i)=>`<div class="table-row demo-step"><span class="profile-cell"><b class="avatar a${i}">${p[0]}</b><em>${p[1]}<small>${p[2]}</small></em></span><span>${p[3]}</span><span>${p[4]}</span><span><i class="status ${p[6]}">${p[5]}</i></span></div>`).join('')}</div><div class="activity compact"><b>Hoạt động hàng đợi</b><div class="demo-step"><i>1</i><span>Maya Home đã qua duyệt nội dung và ảnh</span><time>09:14</time></div><div class="demo-step"><i>2</i><span>Studio North tạm dừng ở checkpoint đăng nhập</span><time>09:16</time></div></div>`},
monitor:{label:'Bình luận MuMu & giám sát trực tiếp',window:'Thực thi Android & giám sát',title:'Thấy tự động hóa đang làm gì ngay khi nó chạy.',description:'Điều phối việc bình luận trên các cửa sổ MuMu đã gắn và theo dõi cả Chrome lẫn Android trên một màn hình.',proofs:['Gắn thiết bị MuMu qua ADB','Chạy thử từng cửa sổ trước khi bình luận thật','Ảnh chụp màn hình, trạng thái và nhật ký vận hành'],demo:()=>`<div class="monitor-grid"><div class="device-card demo-step"><div class="phone"><span></span><b>MuMu 01</b><i>✓</i></div><div><small>Hồ sơ đã gắn</small><strong>Maya Home</strong><span class="status ok">Chạy thử đạt</span></div></div><div class="device-card demo-step"><div class="phone"><span></span><b>MuMu 02</b><i>✓</i></div><div><small>Hồ sơ đã gắn</small><strong>Alex Daily</strong><span class="status ok">Chạy thử đạt</span></div></div><div class="monitor-side"><small>Thao tác thật</small><strong>Đang tắt</strong><p>Chế độ mô phỏng giữ mọi thao tác trên máy và đảo ngược được.</p><div class="shield">◇ <span>Chốt an toàn đang bật</span></div></div></div><div class="console"><div><b>Luồng hoạt động</b><span>Mô phỏng</span></div><p class="demo-step"><time>09:22:10</time><i class="ok-dot"></i>ADB đã kết nối hai cửa sổ khác nhau</p><p class="demo-step"><time>09:22:12</time><i class="ok-dot"></i>Đã tìm thấy ô bình luận trong MuMu 01</p><p class="demo-step"><time>09:22:14</time><i class="pause-dot"></i>Dừng trước khi gửi · chạy thử hoàn tất</p></div>`}
};

const demoCanvas=document.getElementById('demoCanvas'),demoStatus=document.getElementById('demoStatus'),runDemo=document.getElementById('runDemo');let currentFeature='rules',timers=[];
function clearTimers(){timers.forEach(clearTimeout);timers=[]}
function renderFeature(key){clearTimers();currentFeature=key;const f=featureContent[key];document.querySelectorAll('[data-feature]').forEach(item=>{const selected=item.dataset.feature===key;item.classList.toggle('active',selected);item.setAttribute('aria-selected',String(selected))});document.getElementById('featureLabel').textContent=f.label;document.getElementById('featureWindowLabel').textContent=f.window;document.getElementById('demoHeading').textContent=f.label;document.getElementById('featureTitle').textContent=f.title;document.getElementById('featureDescription').textContent=f.description;document.getElementById('featureProofs').innerHTML=f.proofs.map(p=>`<li>${p}</li>`).join('');demoCanvas.innerHTML=f.demo();demoStatus.textContent='Sẵn sàng chạy';runDemo.classList.remove('running');runDemo.innerHTML='<span>▶</span> Chạy demo'}
document.querySelectorAll('[data-feature]').forEach(button=>button.addEventListener('click',()=>renderFeature(button.dataset.feature)));
runDemo.addEventListener('click',()=>{clearTimers();renderFeature(currentFeature);const steps=[...demoCanvas.querySelectorAll('.demo-step')];runDemo.classList.add('running');runDemo.innerHTML='<span class="spinner"></span> Đang chạy';demoStatus.textContent='Đang chạy mô phỏng an toàn…';steps.forEach((step,index)=>timers.push(setTimeout(()=>{step.classList.add('active');if(index>0)steps[index-1].classList.add('done')},180+index*260)));timers.push(setTimeout(()=>{steps.forEach(step=>step.classList.add('done'));demoStatus.textContent='Demo hoàn tất · Không có thao tác thật';runDemo.classList.remove('running');runDemo.innerHTML='<span>↻</span> Chạy lại demo'},500+steps.length*260))});
renderFeature('rules');

const workflowContent={
  profiles:{image:'assets/workflow-profiles.gif',title:'Kết nối hồ sơ',text:'Thư mục hồ sơ và nơi đăng được kiểm tra trước khi quy trình bắt đầu.'},
  sheets:{image:'assets/workflow-sheets.gif',title:'Nhập nội dung',text:'Các dòng đã soạn trên Sheet được đồng bộ, kiểm tra và chuyển thành tác vụ chờ duyệt.'},
  rules:{image:'assets/workflow-rules.gif',title:'Áp quy tắc ảnh',text:'Mỗi hồ sơ áp từ khóa, từ loại trừ và bộ lọc chất lượng hình ảnh của riêng mình.'},
  queue:{image:'assets/workflow-queue.gif',title:'Duyệt hàng đợi',text:'Nội dung, ảnh, lịch đăng và nơi đăng đều hiện rõ trước khi phê duyệt.'},
  checks:{image:'assets/workflow-checks.gif',title:'Chạy kiểm tra thử',text:'Chrome và hai cửa sổ MuMu khác nhau được kiểm tra mà không gửi thao tác thật nào.'},
  enable:{image:'assets/workflow-enable.gif',title:'Bật thao tác thật',text:'Nút đăng bài chỉ mở khóa khi mọi điều kiện sẵn sàng bắt buộc đều đạt.'}
};
const workflowItems=[...document.querySelectorAll('[data-workflow]')];
const workflowFrame=document.querySelector('.workflow-frame');
function selectWorkflow(item){
  const key=item.dataset.workflow,content=workflowContent[key];
  workflowItems.forEach(node=>{const selected=node===item;node.classList.toggle('active',selected);node.setAttribute('aria-pressed',String(selected))});
  document.getElementById('workflowDemoTitle').textContent=content.title;
  document.getElementById('workflowDemoText').textContent=content.text;
  const image=document.getElementById('workflowDemoImage');
  image.src='';image.src=content.image;image.alt=`Ảnh động minh họa bước ${content.title}`;
  workflowFrame.classList.remove('playing');void workflowFrame.offsetWidth;workflowFrame.classList.add('playing');
}
workflowItems.forEach(item=>{
  item.addEventListener('click',()=>selectWorkflow(item));
  item.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectWorkflow(item)}});
});
selectWorkflow(workflowItems[0]);

/* Messenger Hub multi-account demo (fictional data) */
(function(){
const root=document.getElementById('mhAccounts');if(!root)return;
const accounts=[
 {id:'acc_01',name:'Shop Mai Linh',role:'Chủ shop',service:'Messenger',color:'#3b82f6',unread:2,customers:148,state:'ok'},
 {id:'acc_02',name:'CSKH 01 · Thu Hà',role:'Nhân viên bán hàng',service:'Messenger',color:'#10b981',unread:1,customers:212,state:'ok'},
 {id:'acc_03',name:'CSKH 02 · Minh Anh',role:'Nhân viên bán hàng',service:'Messenger',color:'#f59e0b',unread:0,customers:97,state:'ok'},
 {id:'acc_04',name:'Kho Sỉ Hà Nội',role:'Bán sỉ',service:'Messenger',color:'#8b5cf6',unread:3,customers:64,state:'ok'},
 {id:'acc_05',name:'Bé Xinh Store',role:'Hộp thư Page',service:'Facebook Web',color:'#ec4899',unread:0,customers:131,state:'check'},
 {id:'acc_06',name:'Tư Vấn 06 · Lan',role:'Ca đêm',service:'Messenger',color:'#06b6d4',unread:1,customers:58,state:'ok'}
];
const initial=[
 ['acc_04','Chị Hằng (sỉ)','Em lấy 50 áo size M, bên mình báo giá sỉ giúp em nhé','09:41'],
 ['acc_01','Ngọc Trâm','Mẫu váy be còn size S không shop?','09:38'],
 ['acc_02','Anh Tuấn','Mình chuyển khoản rồi nha, check giúp mình','09:35'],
 ['acc_06','Thu Phương','Ship về Đà Nẵng mất mấy ngày ạ?','09:31']
];
const incoming=[
 ['acc_03','Bảo Vy','Cho mình xin bảng size với ạ'],
 ['acc_01','Minh Châu','Shop ơi đơn của em giao chưa ạ?'],
 ['acc_04','Cửa hàng Hoa Mai','Tuần này có hàng mới không chị?'],
 ['acc_02','Quốc Huy','Đổi sang màu đen được không bạn?'],
 ['acc_06','Hải Yến','Tối nay đặt thì mai có nhận được không?'],
 ['acc_01','Kim Ngân','Mình muốn đặt thêm 2 cái nữa']
];
let feed=initial.map(x=>({acc:x[0],from:x[1],text:x[2],time:x[3]}));
let selected='acc_04',timers=[],clock=9*60+42;
const byId=id=>accounts.find(a=>a.id===id);
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function ini(n){return n.replace(/^(CSKH \d+ · |Tư Vấn \d+ · )/,'').trim().charAt(0)}
function renderRail(){
 root.innerHTML=accounts.map(a=>`<button type="button" class="mh-acc${a.id===selected?' on':''}" data-acc="${a.id}" style="--c:${a.color}" aria-label="${esc(a.name)}, ${a.unread} tin chưa đọc" aria-pressed="${a.id===selected}"><span>${ini(a.name)}</span>${a.unread?`<b>${a.unread}</b>`:''}${a.state==='check'?'<i title="Checkpoint">!</i>':''}</button>`).join('');
 const t=accounts.reduce((s,a)=>s+a.unread,0);const tb=document.getElementById('mhTotal');tb.textContent=t;tb.hidden=!t;
}
function renderFeed(flash){
 document.getElementById('mhFeed').innerHTML=feed.map((f,i)=>{const a=byId(f.acc);return `<li><button type="button" class="mh-item${i===0&&flash?' new':''}${f.acc===selected?' sel':''}" data-acc="${f.acc}" style="--c:${a.color}"><span class="mh-av">${esc(f.from.charAt(0))}</span><span class="mh-txt"><span class="mh-row"><b>${esc(f.from)}</b><time>${f.time}</time></span><span class="mh-msg">${esc(f.text)}</span><span class="mh-chip">${esc(a.name)}</span></span></button></li>`}).join('');
 document.getElementById('mhFeedMeta').textContent=`${feed.length} tin nhắn · ${new Set(feed.map(f=>f.acc)).size} tài khoản`;
}
function renderPanel(){
 const a=byId(selected),n=accounts.indexOf(a)+1;
 const st=a.state==='check'?'<span class="status warn">Checkpoint · tạm dừng</span>':'<span class="status ok">Đã đăng nhập</span>';
 document.getElementById('mhPanel').innerHTML=`<div class="mh-ph" style="--c:${a.color}"><span class="mh-big">${ini(a.name)}</span><div><b>${esc(a.name)}</b><small>${a.role} · ${a.service}</small></div></div>
 <dl class="mh-dl">
 <div><dt>Phân vùng phiên</dt><dd class="mono">persist:fb_account_${a.id}</dd></div>
 <div><dt>Cookie · cache · bộ nhớ</dt><dd>Chỉ dành cho tài khoản này</dd></div>
 <div><dt>Trạng thái</dt><dd>${st}</dd></div>
 <div><dt>Tin chưa đọc</dt><dd>${a.unread}</dd></div>
 <div><dt>Khách trong CRM</dt><dd>${a.customers}</dd></div>
 </dl>
 <p class="mh-note">${a.state==='check'?'Facebook yêu cầu tài khoản này xác minh. Hub chỉ dừng tác vụ nền ở tài khoản này, 5 tài khoản còn lại vẫn chạy bình thường.':`Chuyển sang tài khoản ${n}/${accounts.length} sẽ mở khung Messenger đang đăng nhập của riêng tài khoản đó. Các tài khoản khác vẫn giữ đăng nhập phía sau.`}</p>`;
}
function select(id){selected=id;const a=byId(id);a.unread=0;renderRail();renderFeed(false);renderPanel()}
document.querySelector('.mh-body').addEventListener('click',e=>{const b=e.target.closest('[data-acc]');if(b)select(b.dataset.acc)});
document.getElementById('mhFeedBtn').addEventListener('click',()=>{document.getElementById('mhFeed').scrollTop=0});
const run=document.getElementById('mhRun');
run.addEventListener('click',()=>{timers.forEach(clearTimeout);timers=[];run.disabled=true;run.innerHTML='<span class="spinner"></span> Đang nhận tin…';
 incoming.forEach((m,i)=>timers.push(setTimeout(()=>{clock+=1;const t=`${String(Math.floor(clock/60)).padStart(2,'0')}:${String(clock%60).padStart(2,'0')}`;
  feed.unshift({acc:m[0],from:m[1],text:m[2],time:t});if(feed.length>9)feed.pop();const a=byId(m[0]);if(a.id!==selected)a.unread++;renderRail();renderFeed(true);renderPanel();
  if(i===incoming.length-1){run.disabled=false;run.innerHTML='<span>↻</span> Mô phỏng lại'}},500+i*750)));
});
select(selected);
})();
