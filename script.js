(function () {
  var AREAS = ['Digital marketing', 'Product design', 'Data analysis', 'Customer support', 'Web development', 'Sales',
    'Photography & video', 'Graphic design', 'Content creation', 'AI data annotation'];

  var PROJECTS = {
    'Digital marketing': { title: 'Plan a 4-week social media campaign for a small bakery', brief: 'A local bakery wants more customers online. Create a simple 4-week content plan with post ideas, a posting schedule and one goal.' },
    'Product design': { title: 'Redesign the checkout screen of a food delivery app', brief: 'Customers drop off at checkout. Sketch a clearer, faster checkout screen and explain the three changes you made.' },
    'Data analysis': { title: 'Clean and summarise a sales sheet for a retail shop', brief: 'A shop owner has a messy sales spreadsheet. Clean it, find the top three products and write a short summary.' },
    'Customer support': { title: 'Write replies to five customer complaints', brief: 'A growing business gets repeated complaints. Write clear, kind replies and one process change that would reduce them.' },
    'Web development': { title: 'Build a simple booking page for a barber shop', brief: 'A barber wants customers to book online. Build a one-page site with services, prices and a booking form.' },
    'Sales': { title: 'Create an outreach plan for 20 small business leads', brief: 'A new service needs its first customers. Build a lead list, a short message and a follow-up plan.' },
    'Photography & video': { title: 'Shoot and edit 5 product photos for a small online shop', brief: 'A new online shop needs clear, bright product photos. Shoot and edit five images, and write one line on the style you chose.' },
    'Graphic design': { title: 'Design a logo and 3 social posts for a new cafe', brief: 'A new cafe needs a simple brand. Design a logo and three matching social media posts for its opening week.' },
    'Content creation': { title: 'Plan 10 short video ideas for a fitness coach', brief: 'A fitness coach wants to grow online. Write ten short video ideas with a hook for each and a simple posting plan.' },
    'AI data annotation': { title: 'Label 50 sample images and report on quality', brief: 'An AI team needs clean training data. Label fifty sample images using the guide, then write a short report on mistakes you found.' }
  };

  var QUESTIONS = ['Tell me about yourself.', 'Describe a project you completed and what you learned.', 'Why should we hire you for this role?'];
  var STEPS = ['Read the brief and note what the client needs', 'Draft your plan or solution', 'Review and polish your work'];

  var state = {
    screen: 'welcome',
    areas: [],
    level: 'grad',
    tasks: [false, false, false],
    submitted: false,
    resume: false,
    upload: false,
    visibility: 'employers',
    qi: 0,
    stage: 0
  };

  var screenEl = document.getElementById('screen');
  var navEl = document.getElementById('nav');

  function set(patch, keepScroll) {
    for (var k in patch) state[k] = patch[k];
    render(keepScroll);
  }

  function areaLabel() { return state.areas.length ? state.areas[0] : 'Digital marketing'; }
  function project() { return PROJECTS[areaLabel()]; }

  /* ---------- Screens ---------- */

  function welcome() {
    return '<div class="welcome">' +
      '<div class="logo"><div class="logo-mark">J</div>Jobify</div>' +
      '<div>' +
        '<h1>Real work. Real feedback. Ready for the job.</h1>' +
        '<p class="lead">Build proof of your skills with real projects, mentors from industry, and a portfolio employers can trust.</p>' +
        '<div class="points">' +
          '<div><span></span>Practical projects from real workplace tasks</div>' +
          '<div><span></span>Feedback from industry mentors</div>' +
          '<div><span></span>AI help with your resume and interviews</div>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<button type="button" class="btn btn-gold" style="width:100%" data-go="skills">Get started</button>' +
        '<p class="note">Prototype for user testing. All content is sample content.</p>' +
      '</div>' +
    '</div>';
  }

  function skills() {
    var chips = AREAS.map(function (a) {
      var on = state.areas.indexOf(a) > -1;
      return '<button type="button" class="chip" aria-pressed="' + on + '" data-area="' + a + '">' + a + '</button>';
    }).join('');
    var levels = [
      { id: 'grad', label: 'Recent graduate', sub: 'I have a degree but no work experience yet' },
      { id: 'self', label: 'Self-taught, no degree', sub: 'I am learning on my own and want to earn' }
    ].map(function (l) {
      return '<button type="button" class="option" aria-pressed="' + (state.level === l.id) + '" data-level="' + l.id + '"><b>' + l.label + '</b><span>' + l.sub + '</span></button>';
    }).join('');
    return '<div class="pad pad-narrow">' +
      '<div><div class="eyebrow">STEP 1 OF 1 · SKILLS CHECK</div>' +
      '<h2 class="title">What kind of work are you aiming for?</h2>' +
      '<p class="sub">Pick one or more. We will match you to in-demand skills and real projects.</p></div>' +
      '<div class="chips">' + chips + '</div>' +
      '<div class="options"><div class="h3">Where are you right now?</div>' + levels + '</div>' +
      '<button type="button" class="btn" data-go="home">See my matches</button>' +
      '<p class="fineprint">Your details stay private. You decide who can see your portfolio.</p>' +
    '</div>';
  }

  function home() {
    var done = state.tasks.filter(Boolean).length;
    var track = state.level === 'grad' ? 'FIRST-JOB READY' : 'FREELANCE READY';
    return '<div class="pad pad-grid">' +
      '<div class="span"><div class="eyebrow">YOUR TRACK · ' + track + '</div>' +
      '<h2 class="title">Welcome back. Your next project is ready.</h2></div>' +
      '<div class="card">' +
        '<div class="row"><span class="pill">' + areaLabel() + '</span><span class="small">Project 1 of 3</span></div>' +
        '<div class="project-title">' + project().title + '</div>' +
        '<div class="progress"><div style="width:' + Math.round(done / 3 * 100) + '%"></div></div>' +
        '<div class="small">' + done + ' of 3 steps done</div>' +
        '<button type="button" class="btn btn-sm" data-go="project">Open project</button>' +
      '</div>' +
      '<div class="stack"><div class="h3">Your toolkit</div>' +
      '<button type="button" class="tile" data-go="project"><b>Mentor feedback</b><span>Submit your work and get notes from an industry mentor</span></button>' +
      '<button type="button" class="tile" data-go="portfolio"><b>Portfolio and AI resume</b><span>Turn finished projects into an ATS-friendly resume</span></button>' +
      '<button type="button" class="tile" data-go="practice"><b>AI interview practice</b><span>Practise answers and get feedback before the real one</span></button></div>' +
    '</div>';
  }

  function projectScreen() {
    var steps = STEPS.map(function (label, i) {
      return '<button type="button" class="step" aria-pressed="' + state.tasks[i] + '" data-task="' + i + '">' +
        '<span class="box">' + (state.tasks[i] ? '✓' : '') + '</span><span>' + label + '</span></button>';
    }).join('');
    var action = state.submitted
      ? '<div class="card card-strong">' +
          '<div class="mentor"><div class="avatar">M</div><div><div class="h3">Mentor feedback</div><div class="small">Industry mentor · sample comment</div><span class="verified" style="margin-top:4px">✓ Verified mentor</span></div></div>' +
          '<div class="body"><b>What worked:</b> Your plan is clear and easy to follow, and it matches what the client asked for.</div>' +
          '<div class="body"><b>To improve:</b> Add one measurable goal and explain why you chose your approach.</div>' +
          '<div class="body"><b>Next:</b> Revise and resubmit, then add this project to your portfolio.</div>' +
          '<button type="button" class="btn btn-sm" data-go="portfolio">Add to my portfolio</button>' +
        '</div>'
      : '<button type="button" class="btn span" data-submit>Submit for mentor feedback</button>';
    return '<div class="pad pad-grid">' +
      '<button type="button" class="back span" data-go="home">← Back</button>' +
      '<div class="span"><span class="pill">' + areaLabel() + '</span><h2 class="title" style="font-size:26px;margin-top:10px">' + project().title + '</h2></div>' +
      '<div class="card"><div class="small" style="font-weight:700;letter-spacing:0.04em">THE BRIEF</div><div>' + project().brief + '</div></div>' +
      '<div class="options"><div class="h3">Your steps</div>' + steps + '</div>' +
      action +
    '</div>';
  }

  function portfolio() {
    var item = state.submitted
      ? '<div class="card"><span class="pill">Reviewed by a mentor</span><div class="project-title" style="font-size:17px">' + project().title + '</div><div class="small">' + areaLabel() + ' · Real-work project</div></div>'
      : '<div class="card card-dashed"><div class="small" style="font-size:15px">No projects here yet. Finish and submit your first project to add it.</div><button type="button" class="btn btn-sm" data-go="project">Go to my project</button></div>';
    var resume;
    if (state.resume) {
      resume = '<div class="resume"><span class="pill">ATS-friendly format</span>' +
          '<div class="body"><b>Project experience</b></div>' +
          '<div class="body">• Completed a real-work project: ' + project().title + '</div>' +
          '<div class="body">• Received and applied written feedback from an industry mentor</div>' +
          '<div class="body">• Delivered a finished piece of work for a portfolio</div>' +
          '<div class="small">Sample draft. You review and edit every line before using it.</div></div>';
    } else if (state.upload) {
      resume = '<div class="resume"><span class="pill">CV added · sample</span>' +
          '<div class="body"><b>Quick review of your CV</b></div>' +
          '<div class="body">• Good fit for ' + areaLabel() + ' roles</div>' +
          '<div class="body">• Add numbers that show results, such as sales made or followers gained</div>' +
          '<div class="body">• Put your Jobify project near the top</div>' +
          '<button type="button" class="btn btn-sm btn-outline" data-resume>Build a new resume with AI instead</button></div>';
    } else {
      resume = '<div class="btn-stack">' +
          '<button type="button" class="btn btn-sm btn-outline" data-upload>Upload my CV or add a portfolio link</button>' +
          '<button type="button" class="btn btn-sm btn-gold" data-resume>Build a new resume with AI</button></div>';
    }
    var VIS = [
      { id: 'me', label: 'Only me', help: 'Nobody else can see your work or contact details.' },
      { id: 'employers', label: 'Employers I apply to', help: 'Only employers you apply to can see your portfolio. Your phone and email stay hidden until you reply.' },
      { id: 'link', label: 'Anyone with my link', help: 'Share your portfolio link on LinkedIn or your CV. You can turn it off at any time.' }
    ];
    var visHelp = '';
    var segs = VIS.map(function (v) {
      var on = state.visibility === v.id;
      if (on) visHelp = v.help;
      return '<button type="button" aria-pressed="' + on + '" data-vis="' + v.id + '">' + v.label + '</button>';
    }).join('');
    var visibility = '<div class="card"><div class="h3" style="font-size:17px">Who can see my portfolio?</div>' +
      '<div class="seg" role="group" aria-label="Portfolio visibility">' + segs + '</div>' +
      '<div class="small">' + visHelp + '</div></div>';
    return '<div class="pad pad-grid">' +
      '<h2 class="title span" style="margin-top:0">My portfolio</h2>' +
      '<div class="stack">' + item + visibility +
      '<div class="card"><div class="h3" style="font-size:17px">CV and resume</div><div class="body small">Already have a CV or portfolio? Upload it for a quick review. Or let AI build an ATS-friendly resume from your Jobify work.</div>' + resume + '</div></div>' +
      '<div class="stack"><div class="h3">Jobs and freelance matches</div>' +
      '<div class="card"><div class="row"><div><div class="h3" style="font-size:15px">Entry-level role · [Company name]</div><div class="small">Matches your ' + areaLabel() + ' skills</div><span class="verified" style="margin-top:6px">✓ Verified employer</span></div><span class="pill pill-gold">Full-time</span></div></div>' +
      '<div class="card"><div class="row"><div><div class="h3" style="font-size:15px">Small project · [Client name]</div><div class="small">Paid freelance work</div><span class="verified" style="margin-top:6px">✓ Verified client</span></div><span class="pill pill-gold">Freelance</span></div></div>' +
      '<div class="trust"><b>Safe by design.</b> Jobify checks every employer and client before a listing appears. You never pay to apply.</div></div>' +
    '</div>';
  }

  function practice() {
    var q = QUESTIONS[state.qi % QUESTIONS.length];
    var body;
    if (state.stage === 0) {
      body = '<button type="button" class="btn btn-gold" style="min-height:56px" data-rec="1">Tap to answer</button>';
    } else if (state.stage === 1) {
      body = '<div class="card"><div class="rec"><i></i>Listening to your answer…</div><button type="button" class="btn btn-sm" data-rec="2">Finish and get feedback</button></div>';
    } else {
      body = '<div class="card card-strong"><div class="h3">AI feedback (sample)</div>' +
        '<div class="body"><b>Clear opening:</b> You started with a direct answer. Good.</div>' +
        '<div class="body"><b>Add an example:</b> Tell one short story from a project to back up your point.</div>' +
        '<div class="body"><b>Close strong:</b> End with what you would bring to the role.</div>' +
        '<div class="btn-row"><button type="button" class="btn btn-sm btn-outline" data-rec="1">Try again</button><button type="button" class="btn btn-sm" data-next>Next question</button></div></div>';
    }
    return '<div class="pad pad-narrow">' +
      '<div><div class="eyebrow">AI INTERVIEW PRACTICE · QUESTION ' + ((state.qi % QUESTIONS.length) + 1) + ' OF ' + QUESTIONS.length + '</div>' +
      '<h2 class="title">Practise the real thing.</h2></div>' +
      '<div class="question"><small>INTERVIEWER ASKS</small><div>' + q + '</div></div>' +
      body +
    '</div>';
  }

  /* ---------- Render ---------- */

  var SCREENS = { welcome: welcome, skills: skills, home: home, project: projectScreen, portfolio: portfolio, practice: practice };
  var desktop = window.matchMedia('(min-width: 900px)');
  var topnavEl = document.getElementById('topnav');

  function jump(y) { window.scrollTo({ top: y, behavior: 'instant' }); }

  function render(keepScroll) {
    // On desktop the landing page replaces the welcome screen
    if (desktop.matches && state.screen === 'welcome') state.screen = 'skills';
    var y = screenEl.scrollTop;
    var wy = window.scrollY;
    screenEl.setAttribute('data-screen', state.screen);
    screenEl.innerHTML = SCREENS[state.screen]();
    if (keepScroll) { screenEl.scrollTop = y; jump(wy); }
    else { screenEl.scrollTop = 0; jump(0); }
    var showNav = state.screen !== 'welcome' && state.screen !== 'skills';
    navEl.hidden = !showNav;
    topnavEl.hidden = !showNav;
    [navEl, topnavEl].forEach(function (nav) {
      Array.prototype.forEach.call(nav.querySelectorAll('button'), function (b) {
        b.classList.toggle('active', b.getAttribute('data-go') === state.screen);
      });
    });
  }

  /* ---------- Events ---------- */

  function onClick(e) {
    var t = e.target.closest('button');
    if (!t) return;

    // Landing page: enter the app / return to the landing page
    if (t.hasAttribute('data-start')) { document.body.classList.remove('on-landing'); return set({ screen: 'skills' }); }
    if (t.hasAttribute('data-landing')) { document.body.classList.add('on-landing'); return jump(0); }

    if (t.hasAttribute('data-go')) return set({ screen: t.getAttribute('data-go'), stage: state.screen === 'practice' ? 0 : state.stage });

    if (t.hasAttribute('data-area')) {
      var a = t.getAttribute('data-area');
      var i = state.areas.indexOf(a);
      var next = state.areas.slice();
      if (i > -1) next.splice(i, 1); else next.push(a);
      return set({ areas: next }, true);
    }
    if (t.hasAttribute('data-level')) return set({ level: t.getAttribute('data-level') }, true);
    if (t.hasAttribute('data-task')) {
      var n = Number(t.getAttribute('data-task'));
      var tasks = state.tasks.slice(); tasks[n] = !tasks[n];
      return set({ tasks: tasks }, true);
    }
    if (t.hasAttribute('data-submit')) return set({ submitted: true });
    if (t.hasAttribute('data-resume')) return set({ resume: true, upload: false }, true);
    if (t.hasAttribute('data-upload')) return set({ upload: true }, true);
    if (t.hasAttribute('data-vis')) return set({ visibility: t.getAttribute('data-vis') }, true);
    if (t.hasAttribute('data-rec')) return set({ stage: Number(t.getAttribute('data-rec')) });
    if (t.hasAttribute('data-next')) return set({ qi: state.qi + 1, stage: 0 });
  }

  document.addEventListener('click', onClick);
  if (desktop.addEventListener) desktop.addEventListener('change', function () { render(true); });

  render();
})();
