import { NextPage, NextPageContext } from 'next';


interface Props {
    statusCode?: number
}

const Error: NextPage<Props> = ({ statusCode }) => {
    return (
        <div className='text-center mt-40 text-3xl font-black'>
        {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </div>
    );
  }
  
  Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error