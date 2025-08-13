document.addEventListener('DOMContentLoaded', () => {
  fetch('./js/project/project.json')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('.summary__tableau');
      container.innerHTML = '';

      data.projects.forEach(p => {
        const a = document.createElement('a');
        a.textContent = p.title;
        a.href = `#${p.id}`;
        container.appendChild(a);
      });
    });
});