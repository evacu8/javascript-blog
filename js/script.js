{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  };

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const selectedArticle = document.querySelector(hrefAttribute);

    /* [DONE] add class 'active' to the correct article */

    selectedArticle.classList.add('active');
  };

  const generateTitleLinks = function(customSelector = '') {

    /* [DONE] for each article: */

    const allArticles = document.querySelectorAll('.post' + customSelector);
    const titleList = document.querySelector(select.listOf.titles);
    let titleLinksListHTML = '';

    for (let article of allArticles){

      /* [DONE] find id */

      const articleId = article.getAttribute('id');

      /* [DONE] find title */

      const articleTitle = article.querySelector('h3').innerText;

      /* [DONE] create HTML for li */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* [DONE] join created HTML links into HTML variable */

      titleLinksListHTML = titleLinksListHTML + linkHTML;

    }

    /* [DONE] insert HTML variable into ul */

    titleList.innerHTML = titleLinksListHTML;

    /* [DONE] click event listener for title links */

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function(tags) {

    /* create an object with min and max number of tag appearances */

    const params = {'max': 0, 'min': 999999};

    /* START LOOP: for every tag */
    for (let tag in tags) {

      /* replace params.max value if the tag count is higher, replace params.min with the tag count if params.min is higher */
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      } else if (params.min > tags[tag]) {
        params.min = tags[tag];
      }
    }
    /* END LOOP: for every tag */

    return params;
  };

  const calculateTagClass = function(count, params) {

    /* calculate proportion of count to range */
    const multiplier = (count - params.min) / (params.max - params.min);
    // console.log(multiplier);

    /* calculate rouded down class prefix */
    const classNumber = Math.floor(multiplier * (opts.tagSizes.count - 1) + 1);
    // console.log(`classNumber: ${classNumber}`);

    /* return tag-size class */

    return `${opts.tagSizes.classPrefix}${classNumber}`;
  };

  const generateTags = function() {

    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */

    const allArticles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: for every article: */

    for (let article of allArticles) {

      /* [DONE] find tags wrapper (ul)*/

      const tagsWrapper = article.querySelector(select.article.tags);

      /* [DONE] make html variable with empty string */

      let tagLinksListHTML = '';

      /* [DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* [DONE] generate HTML of the link */

        const linkHTMLData = {tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        /* [DONE] add generated code to html variable */

        tagLinksListHTML = tagLinksListHTML + ' ' + linkHTML;

        /* [DONE] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [DONE] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = tagLinksListHTML;

    /* [DONE] END LOOP: for every article: */
    }
    /* [DONE] find list of tags in right column */

    const tagList = document.querySelector(select.listOf.tags);

    /* [DONE] find min and max number of tag appearances */

    const tagsParams = calculateTagsParams(allTags);

    /* [DONE] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [DONE] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [DONE] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}"><span>${tag} &nbsp</span></a></li>`;
      allTagsHTML += tagLinkHTML;
    }
    /* [DONE] END LOOP: for each tag in allTags: */

    /* [DONE] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  };

  generateTags();

  const tagClickHandler = function(event) {

    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for (let activeTagLink of activeTagLinks) {

      /* remove class active */

      activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */

    const selectedTagLinks = document.querySelectorAll(`a[href="${href}"`);

    /* START LOOP: for each found tag link */

    for (let selectedTagLink of selectedTagLinks) {

      /* add class active */

      selectedTagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks(`[data-tags~="${tag}"]`);
  };

  const addClickListenersToTags = function() {

    /* [DONE] find all links to tags */

    const links = document.querySelectorAll('a[href^="#tag-"');

    /* [DONE] START LOOP: for each link */

    for (let link of links) {

      /* [DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };

  const generateAuthors = function() {

    /* [DONE] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* [DONE] find all articles */

    const allArticles = document.querySelectorAll('.post');
    const authorsList = document.querySelector(select.listOf.authors);

    /* create variable for all author links */
    let allAuthorsHTML = '';

    /* [DONE] START LOOP: for every article: */

    for (let article of allArticles) {

      /* [DONE] find authors wrapper (p)*/

      const authorWrapper = article.querySelector(select.article.author);

      /* [DONE] get author from data-author attribute */

      const articleAuthor = article.getAttribute('data-author');

      /* [] check if author is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]) {
        /* [] add author to allAuthors object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* [DONE] generate HTML of the link */

      const linkHTMLData = {author: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      /* [DONE] insert HTML of the link into the author wrapper */

      authorWrapper.innerHTML = `by ${linkHTML}`;

    /* [DONE] END LOOP: for every article: */
    }

    /* [ ] START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){
    /* [ ] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = `<li><a href="#author-${author}"><span>${author} &nbsp ${allAuthors[author]}</span></a></li>`;
      allAuthorsHTML += authorLinkHTML;
    }
    /* [ ] END LOOP: for each tag in allAuthors: */

    /* [DONE] add HTML from allAuthorsHTML to authorsList */
    authorsList.innerHTML = allAuthorsHTML;

  };

  generateAuthors();

  addClickListenersToTags();

  const authorClickHandler = function(event) {

    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

    /* find all author links with class active */

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */

    for (let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */

      activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */

    const selectedAuthorLinks = document.querySelectorAll(`a[href="${href}"`);

    /* START LOOP: for each found author link */

    for (let selectedAuthorLink of selectedAuthorLinks) {

      /* add class active */

      selectedAuthorLink.classList.add('active');

    /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks(`[data-author="${author}"]`);
  };

  const addClickListenersToAuthors = function() {

    /* [DONE] find all links to authors */

    const links = document.querySelectorAll('a[href^="#author-"');

    /* [DONE] START LOOP: for each link */

    for (let link of links) {

      /* [DONE] add authorClickHandler as event listener for that link */

      link.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();
}
