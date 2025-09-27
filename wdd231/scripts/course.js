// course.js
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "WDD231", name: "Frontend Web Development I", credits: 3, type: "WDD", completed: false },
  { code: "CSE111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
  { code: "CSE210", name: "Programming with Classes", credits: 2, type: "CSE", completed: false }
];

const courseGrid = document.getElementById('course-grid');
const totalCredits = document.getElementById('total-credits');

function render(list){
  if(!courseGrid) return;
  courseGrid.innerHTML = '';
  list.forEach(c => {
    const div = document.createElement('div');
    div.className = 'course-card' + (c.completed ? ' completed' : '');
    div.innerHTML = `<h3>${c.code} — ${c.name}</h3>
                     <p>Type: ${c.type} &nbsp; | &nbsp; Credits: ${c.credits}</p>
                     ${c.completed ? '<p class="muted">Completed ✓</p>' : ''}`;
    courseGrid.appendChild(div);
  });
  const creditsSum = list.reduce((sum, cur) => sum + (cur.credits || 0), 0);
  if(totalCredits) totalCredits.textContent = creditsSum;
}

/* filter buttons */
document.addEventListener('DOMContentLoaded', () => {
  render(courses);
  document.getElementById('all').addEventListener('click', () => render(courses));
  document.getElementById('wdd').addEventListener('click', () => render(courses.filter(c => c.type === 'WDD')));
  document.getElementById('cse').addEventListener('click', () => render(courses.filter(c => c.type === 'CSE')));
});
