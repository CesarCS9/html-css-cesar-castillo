# Rainy Days – HTML & CSS Course Assignment

## Brief

This project is the final delivery for the HTML & CSS Course Assignment.  
My goal was to build a properly functioning, responsive website based on the prototype created in Design 1, using only HTML and CSS, without any CSS frameworks or JavaScript.

The site includes all required pages from the site architecture:
- Home  
- Product Details  
- Cart  
- Payment  
- Confirmation  
- Coming Soon  

All pages are responsive and adapt properly to mobile, tablet, and desktop screen sizes.

Some interactive functionality that would normally require JavaScript is mimicked using page navigation (for example, buttons redirecting to a “Coming Soon” page).


## Live Site

website:  
 https://cesarcs9.github.io/html-css-cesar-castillo/

GitHub repository:  
https://github.com/cesarcs9/html-css-cesar-castillo

Prototype:
https://www.figma.com/proto/SdYSl3CzFm0yc1jdNQyU4c/RainyDays-Prototype?node-id=0-1&t=eWKvicLWjdi5UrZc-1


## Requirements Covered

- Semantic and clean HTML structure  
- CSS written following the DRY principle  
- Fully responsive layout using Flexbox and CSS Grid  
- No CSS frameworks used  
- WCAG accessibility considered:
  - Alt attributes on images  
  - Readable font sizes  
  - Sufficient contrast  
- Each page has:
  - Unique : title
  - Unique : meta name="description
  - Unique : h1


## Technical Decisions

- **Coming Soon page**  
  A Coming Soon page was created to handle unfinished features such as:
  - Hamburger menu
  - Search
  - Future functionality  
  This keeps navigation logical and avoids dead links.

- **Buttons replaced with links**  
  Some buttons that did not have real functionality were replaced with anchor tags pointing to the Coming Soon page.  
  This keeps the site usable and semantically correct.

- **Edited images instead of complex CSS**  
  Some images were edited beforehand (for example the hashtag image) instead of forcing heavy positioning with CSS.  
  This improved layout stability across devices.

- **Hero section simplification on mobile**  
  On very small screens, part of the hero text is hidden to preserve layout integrity and avoid breaking the design.

- **CSS file structure**  
  The CSS was separated into one CSS file per page and:
  - "reset.css"
  - "variables.css"
  - "responsive.css"  


## Responsive Design

The site adapts to:
- Mobile  
- Tablet  
- Desktop  

Flexbox and Grid were used depending on layout needs.  
All pages were tested using Chrome DevTools and different viewport sizes.

## Validation

- All HTML files were validated using the W3C Markup Validator  
- CSS structure was reviewed for consistency  
- Horizontal scrolling was avoided  
- Accessibility best practices were applied

## Deployment Notes

During deployment to GitHub Pages, stylesheet loading issues were encountered due to path resolution and caching.  
After correcting their paths and removing unnecessary "@import", the issue was fully resolved.

This helped me reinforce understanding of:
- Asset paths in production
- Browser caching
- Static site deployment

## Tools & Technologies

- HTML5  
- CSS3  
- Flexbox  
- CSS Grid  
- Google Fonts  
- Font Awesome  
- GitHub  
- GitHub Pages  
- Chrome DevTools  
- W3C HTML Validator  

## Final Thoughts

This project represents a complete responsive website closely matching the original prototype (around 95% I would say).  
The differences are conscious design decisions made to preserve usability and layout stability, especially on smaller screens.

I have to say that it has been a personal challenge where I clearly felt the increase in difficulty compared to previous assignments. There were many moments where I got stuck trying to solve specific problems, and interestingly, those same problems often led me to discover alternative solutions or better approaches.

I learned a lot from my own mistakes, and I can already see that tasks which took me hours at the beginning would now be much faster to reproduce thanks to the practice gained during this project. The debugging process, especially with responsive design and CSS structure, helped me understand how important planning and clean architecture really are.

I genuinely enjoyed the whole process of bringing my Figma prototype to life and turning a static design into a functional website. Seeing the project evolve step by step was very motivating. This assignment also made me even more excited to start learning JavaScript, as it feels like the cherry on top that will allow me to add real interactivity and complete the experience to my website.


