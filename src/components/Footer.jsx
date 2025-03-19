import "react";

const date = new Date();

function Footer(){
  return(
    <footer>
      <p> @Vonjtech Copyright {date.getFullYear()}. </p>
    </footer>
  )
}

export default Footer;
