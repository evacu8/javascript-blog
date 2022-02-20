{
  'use strict';

  const titleClickHandler = function(event){
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

  const generateTitleLinks = function(customSelector = ''){

    /* [DONE] for each article: */

    const allArticles = document.querySelectorAll('.post' + customSelector);
    const titlesListSelector = document.querySelector('ul.titles');
    let titleLinkHTML = '';
    let titleLinksListHTML = '';

    for (let article of allArticles){

      /* [DONE] find id */

      const articleId = article.getAttribute('id');

      /* [DONE] find title */

      const articleTitle = article.querySelector('h3').innerText;

      /* [DONE] create HTML for li */

      titleLinkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

      /* [DONE] join created HTML links into HTML variable */

      titleLinksListHTML = titleLinksListHTML + titleLinkHTML;

    }

    /* [DONE] insert HTML variable into ul */

    titlesListSelector.innerHTML = titleLinksListHTML;

    /* [DONE] click event listener for title links */

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags = function (){

    /* [DONE] find all articles */

    const allArticles = document.querySelectorAll('.post');

    /* [DONE] START LOOP: for every article: */

    for (let article of allArticles) {

      /* [DONE] find tags wrapper (ul)*/

      const optArticleTagsSelector = '.post-tags .list';
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      // console.log(tagsWrapper);

      /* [DONE] make html variable with empty string */

      let tagLinksListHTML = '';
      let tagLinkHTML = '';

      /* [DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      // console.log(articleTags);

      /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* [DONE] generate HTML of the link */

        tagLinkHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;

        // console.log(tagLinkHTML);

        /* [DONE] add generated code to html variable */

        tagLinksListHTML = tagLinksListHTML + ' ' + tagLinkHTML;

      /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = tagLinksListHTML;
      // console.log(tagLinksListHTML);

    /* [DONE] END LOOP: for every article: */
    }
  };

  generateTags();

  const tagClickHandler = function (event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log(href);
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    // console.log(tag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    // console.log(activeTagLinks);
    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const selectedTagLinks = document.querySelectorAll(`a[href="${href}"`);
    // console.log(selectedTagLinks);
    /* START LOOP: for each found tag link */
    for (let selectedTagLink of selectedTagLinks) {
      /* add class active */
      selectedTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    // console.log(selectedTagLinks);
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`);
  };

  const addClickListenersToTags = function (){
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"');
    // console.log(links);
    /* [DONE] START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* [DONE] END LOOP: for each link */
    }
  };

  const generateAuthors = function (){

    /* [DONE] find all articles */

    const allArticles = document.querySelectorAll('.post');

    /* [DONE] START LOOP: for every article: */

    for (let article of allArticles) {

      /* [DONE] find authors wrapper (p)*/

      const optArticleAuthorSelector = '.post-author';
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log(authorWrapper);

      /* [DONE] make html variable with empty string */

      let authorLinkHTML = '';

      /* [DONE] get author from data-author attribute */

      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      /* [DONE] generate HTML of the link */

      authorLinkHTML = `<li><a href="#author-${articleAuthor}"><span>${articleAuthor}</span></a></li>`;

      console.log(authorLinkHTML);

      /* [DONE] insert HTML of the link into the author wrapper */

      authorWrapper.innerHTML = `by ${authorLinkHTML}`;
      console.log(authorLinkHTML);

    /* [DONE] END LOOP: for every article: */
    }
  };

  generateAuthors();

  addClickListenersToTags();
}
