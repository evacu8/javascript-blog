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

  const generateTitleLinks = function(){

    /* [DONE] for each article: */

    const allArticles = document.querySelectorAll('.posts article');
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
}

function generateTags(){

  /* [DONE] find all articles */

  const allArticles = document.querySelectorAll('.posts article');


  /* [DONE] START LOOP: for every article: */

  for (let article of allArticles) {

    /* [DONE] find tags wrapper (ul)*/

    const optArticleTagsSelector = '.post-tags .list';
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

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
    console.log(tagLinksListHTML);

  /* [DONE] END LOOP: for every article: */
  }

}

generateTags();
