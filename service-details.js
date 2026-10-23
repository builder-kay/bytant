(() => {
  const services = [
  {
    "key": "web",
    "title": "Web & Mobile Products",
    "intro": "Turn a new idea or an existing workflow into a useful website, app, or digital platform.",
    "fit": "For founders, growing businesses, and teams replacing manual processes.",
    "includes": [
      "Business websites and landing pages",
      "Web platforms, portals, and dashboards",
      "Mobile application experiences",
      "Backend services and third-party integrations"
    ],
    "deliverables": [
      "Agreed requirements and user flows",
      "Responsive interfaces and working software",
      "Testing, deployment guidance, and technical handover"
    ],
    "process": [
      "Discover the users, business goals, and constraints.",
      "Prototype the core journeys and agree the scope.",
      "Build and test in reviewable stages.",
      "Launch, hand over, and plan improvements."
    ],
    "bring": "Your idea, current website or workflow, intended users, and any required integrations.",
    "project": "Website or web platform"
  },
  {
    "key": "ai",
    "title": "AI Solutions",
    "intro": "Use AI where it solves a clear problem: less repetitive work, easier access to knowledge, and more useful digital services.",
    "fit": "For teams exploring automation, assistants, and AI features in an existing product.",
    "includes": [
      "AI assistants and knowledge search",
      "Document and information workflows",
      "AI features for web applications",
      "Workflow automation and integrations"
    ],
    "deliverables": [
      "A scoped use case and feasibility assessment",
      "A working prototype or integrated feature",
      "Evaluation criteria, usage guidance, and handover notes"
    ],
    "process": [
      "Identify a specific task and define success.",
      "Review data access, privacy, and practical constraints.",
      "Prototype and evaluate against real examples.",
      "Integrate with human review where needed."
    ],
    "bring": "Examples of the task, sample non-sensitive data, existing systems, and the outcome you want.",
    "project": "AI solution"
  },
  {
    "key": "data",
    "title": "Data Science",
    "intro": "Make better use of your data with clear analysis, useful reporting, and models that answer practical questions.",
    "fit": "For organizations that need to understand performance, spot patterns, or plan ahead.",
    "includes": [
      "Data exploration and preparation",
      "Business reporting and dashboards",
      "Forecasting and predictive modelling",
      "Analysis of trends and performance"
    ],
    "deliverables": [
      "An agreed analysis question and data plan",
      "Reports, dashboards, or models suited to the brief",
      "Documented assumptions, limitations, and handover"
    ],
    "process": [
      "Define the decision your data should support.",
      "Assess quality, permissions, and availability.",
      "Analyse, visualise, and validate the findings.",
      "Explain the results and how to use them."
    ],
    "bring": "Your business questions, available datasets, reporting tools, and any data access constraints.",
    "project": "Data analysis or dashboard"
  },
  {
    "key": "security",
    "title": "Cybersecurity",
    "intro": "Understand your risks and strengthen the systems, workflows, and practices that protect your business.",
    "fit": "For teams building a new platform or improving the security of existing technology.",
    "includes": [
      "Application and configuration reviews",
      "Threat modelling and risk assessment",
      "Secure development guidance",
      "Practical security recommendations"
    ],
    "deliverables": [
      "An agreed scope and written authorization for any testing",
      "Prioritised findings with practical remediation steps",
      "Review notes and guidance for follow-up verification"
    ],
    "process": [
      "Agree the systems, boundaries, and authorized activities.",
      "Review risks, configurations, and relevant controls.",
      "Explain findings and prioritise remediation.",
      "Support improvements and agree follow-up checks."
    ],
    "bring": "System information, your main concerns, ownership details, and the scope you want reviewed.",
    "project": "Cybersecurity support"
  },
  {
    "key": "design",
    "title": "UI/UX & Product Design",
    "intro": "Make a product easier to understand and more satisfying to use, from the first journey to the final screen.",
    "fit": "For founders validating an idea and teams improving an existing product experience.",
    "includes": [
      "User journeys and information architecture",
      "Wireframes and interactive prototypes",
      "Interface design and reusable components",
      "Usability reviews and accessibility considerations"
    ],
    "deliverables": [
      "Agreed user flows and design direction",
      "Interface designs or an interactive prototype",
      "Design files and developer handover guidance"
    ],
    "process": [
      "Understand the users and the job they need to do.",
      "Map journeys and explore possible solutions.",
      "Prototype, gather feedback, and refine.",
      "Prepare the final design for implementation."
    ],
    "bring": "Your product goals, audience, existing screens or research, and brand assets if available.",
    "project": "Product design or prototype"
  },
  {
    "key": "graphic",
    "title": "Graphic Design",
    "intro": "Give your ideas a clear visual identity with thoughtful brand materials and creative assets.",
    "fit": "For new brands, campaigns, and businesses that need consistent visual communication.",
    "includes": [
      "Visual identity and brand direction",
      "Campaign and social media creative",
      "Presentation and marketing materials",
      "Digital and print-ready layouts"
    ],
    "deliverables": [
      "An agreed creative direction",
      "Final assets in the formats agreed for the project",
      "Editable files or usage guidance where included in scope"
    ],
    "process": [
      "Define the audience, message, and intended formats.",
      "Explore a focused visual direction.",
      "Develop the designs and review together.",
      "Prepare final assets for their intended use."
    ],
    "bring": "Your brief, logo or brand references, final copy, preferred formats, and any production specifications.",
    "project": "Graphic design or branding"
  }
];
  const dialog = document.getElementById('service-details');
  if (!dialog) return;
  const content = dialog.querySelector('.service-detail-content');
  let selected;
  const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
  const steps = items => `<ol>${items.map(item => `<li>${item}</li>`).join('')}</ol>`;
  document.querySelectorAll('[data-service-detail]').forEach(button => {
    button.addEventListener('click', () => {
      selected = services.find(service => service.key === button.dataset.serviceDetail);
      if (!selected) return;
      content.innerHTML = `
        <img class="service-detail-image" src="assets/img/services/${selected.key}.jpg" alt="">
        <div class="service-detail-body">
          <p class="eyebrow">Explore the service</p>
          <h2 id="service-detail-title">${selected.title}</h2>
          <p class="service-detail-intro">${selected.intro}</p>
          <p class="service-detail-fit">${selected.fit}</p>
          <section aria-labelledby="detail-includes"><h3 id="detail-includes">What we can help with</h3>${list(selected.includes)}</section>
          <section aria-labelledby="detail-deliverables"><h3 id="detail-deliverables">What you can expect</h3>${list(selected.deliverables)}</section>
          <section aria-labelledby="detail-process"><h3 id="detail-process">How we approach it</h3>${steps(selected.process)}</section>
          <section aria-labelledby="detail-preparation"><h3 id="detail-preparation">What to bring</h3><p>${selected.bring}</p></section>
          <section aria-labelledby="detail-scope"><h3 id="detail-scope">Scope, timing & budget</h3><p>We agree on deliverables, revisions, responsibilities, timing, and budget after reviewing your brief. Ongoing support, hosting, and third-party costs are discussed separately where relevant.</p></section>
        </div>`;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('service-detail-open');
    });
  });
  dialog.querySelector('[data-close-service]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('service-detail-open'));
  dialog.querySelector('[data-inquire-service]').addEventListener('click', () => {
    dialog.close();
    const select = document.querySelector('[name="projectType"]');
    if (selected && select) select.value = selected.project;
    toggleModal(contactModal, true);
  });
})();
