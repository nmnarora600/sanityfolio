import {useNextSanityImage} from 'next-sanity-image'
import Image from 'next/image';
import {createClient} from 'next-sanity'
const sanityConfig = createClient({
    projectId:'u1czuu47',
    dataset:'production',
  useCdn: false,
  apiVersion:'2023-05-03'
});

const SanityImage = ({ asset }) => {
  const imageProps = useNextSanityImage(sanityConfig, asset);

  if (!imageProps) return null;

  return (
  
  <Image 
    {...imageProps}
    
    sizes='(max-width: 800px) 100vw, 800px'
    alt='content image'
   className='md:w-[50vw]'
  />);
}
export default SanityImage;