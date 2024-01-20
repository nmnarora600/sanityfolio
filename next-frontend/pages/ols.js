import {createClient} from 'next-sanity'
import {PortableText} from '@portabletext/react'

import Image from 'next/image';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import imageUrlBuilder from "@sanity/image-url";

import SanityImage from './SanityImage';
export default  function Home({blogs}) {

  const getVideoId=(inputString)=>{
   
    const regex = /(?:\?|&)v=([^&]+)/;
    const match = inputString.match(regex);
  
    return match ? match[1] : inputString;
  
}





const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <SanityImage {...value} />
      );
    },
    code: ({ value }) => {
    
      return (
        <div className=' flex justify-center min-w-max items-center'>
        <SyntaxHighlighter language={value.language} >
        {value.code}
      </SyntaxHighlighter>
      </div>
      );
    },
    youtube: ({ value }) => {
    
      console.log("yt",value)
      let vid= getVideoId(value.url)
      console.log("embed", `https://www.youtube.com/embed/${vid}`)
      return(
        <div  >
          {/* Your custom rendering for the youtube block */}
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${vid}`}
            title="YouTube video player"
            frameBorder="0"
          
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
        </div>
      )
    },
   
  },
}
const codeSerializer = ({ children }) => (
  <SyntaxHighlighter language="jsx" >
    {children}{console.log(children)}
  </SyntaxHighlighter>
);
// const builder = imageUrlBuilder({ projectId: 'u1czuu47', dataset: 'production'});
// const imageRef = blogs[1].blogimg.asset._ref;
// const imageUrl = builder.image(imageRef).url();
// function urlFor(source) {
//   return builder.image(source);
// }
// console.log("builder", imageUrl)
const blog=blogs[2]
console.log("blog", blog)
  return (
    <div className="home">
      <h1>{blog.title}</h1>
      <div className="nav">
    <pre className='bg-secondary text-white'>  <span><code>This is code</code></span></pre>
    <PortableText
  value={blog.content}
  components={myPortableTextComponents}
  projectId='u1czuu47'
  dataset='production'
  serializers={{
   
  }}
/>

    
      </div>
   
    </div>
  )
}

export async function getServerSideProps(context){
  const client= createClient({
    projectId: 'u1czuu47',
    dataset: 'production',
    useCdn:true,
    apiVersion:'2023-05-03'

  })
  const query=`*[_type=="blog"]`;
  const blogs=await client.fetch(query);

  return{
    props:{
      blogs
    }
    
  }
}