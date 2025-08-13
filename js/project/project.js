document.addEventListener('DOMContentLoaded', function () {
  fetch('./js/project/project.json')
    .then(response => response.json())
    .then(data => {
      const projectsContainer = document.querySelector('.borderProject');

      data.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'borderProject__01';
        projectElement.id = project.id;

        ['top', 'left', 'right', 'bottom'].forEach(position => {
          const borderElement = document.createElement('div');
          borderElement.className = `borderProject__${position}`;
          projectElement.appendChild(borderElement);
        });

        const sliderElement = document.createElement('div');
        sliderElement.className = 'slider';
        projectElement.appendChild(sliderElement);

        const nextButton = document.createElement('div');
        nextButton.className = 'next';
        const whiteTriangle = document.createElement('span');
        whiteTriangle.className = 'whiteTriangle';
        nextButton.appendChild(whiteTriangle);
        sliderElement.appendChild(nextButton);

        project.slides.forEach((slide, index) => {
          const slideElement = document.createElement('div');
          slideElement.className = 'slide';
          slideElement.id = 'slide' + (index + 1);
          const imgElement = document.createElement('img');
          imgElement.src = slide.imgSrc;
          imgElement.alt = slide.imgAlt;
          slideElement.appendChild(imgElement);
          sliderElement.appendChild(slideElement);
        });

        const titleElement = document.createElement('h3');
        titleElement.className = 'recentProject__titleProject';
        titleElement.textContent = project.title;
        projectElement.appendChild(titleElement);

        const textElement = document.createElement('p');
        textElement.className = 'recentProject__text';
        textElement.textContent = project.text;
        projectElement.appendChild(textElement);

        const buttons = document.createElement('div');
        buttons.className = 'button-row';

        function makeBtn(text, href) {
          const slot = document.createElement('div');
          slot.className = 'button-slot';

          const a = document.createElement('a');
          a.className = 'button__visitWebsite';
          a.textContent = text;
          a.href = href;

          slot.appendChild(a);
          return slot;
        }

        buttons.appendChild(makeBtn('Visit Website', project.visitWebsiteLink));
        buttons.appendChild(makeBtn('Contact Me', project.contactLink || '#contact'));
        buttons.appendChild(makeBtn('Summary', project.summaryLink || '#summary'));

        projectElement.appendChild(buttons);

        projectsContainer.appendChild(projectElement);

        initCarousel(sliderElement);
      });
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
});
