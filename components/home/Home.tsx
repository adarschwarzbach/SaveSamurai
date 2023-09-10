import { useGlobalState, useSetGlobalState } from '../../contexts/GlobalState';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import SampleUpload from './SampleUpload';
import UserUpload from './UserUpload';

// eslint-disable-next-line react/prop-types
const Divider: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <div className="my-6 flex items-center justify-center p-12">
            <div
                style={{
                    backgroundColor: darkMode ? '#D3D8DE' : '#ABB3BF',
                    width: '40vw',
                    height: '.75px'
                }}
            />
            <span
                style={{ color: darkMode ? 'white' : '#ABB3BF' }}
                className="mx-2 text-lg"
            >
                or
            </span>
            <div
                style={{
                    backgroundColor: darkMode ? '#D3D8DE' : '#ABB3BF',
                    width: '40vw',
                    height: '.75px'
                }}
            />
        </div>
    );
};

export default function Home() {
    const { darkMode } = useGlobalState();

    return (
        <div
            className={
                darkMode
                    ? 'bg-gray-900 text-white bp3-dark'
                    : 'bg-white text-black'
            }
        >
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <h1 className="text-6xl text-center mb-4 font-semibold">
                    Budgeting Made Accessible
                </h1>
                <h2 className="text-4xl text-center mb-6 w-1/2 pb-12">
                    Upload your own financial history or test our product with a
                    fictional profile
                </h2>
                <p className="text-xl text-center p-6"></p>
                <UserUpload />

                <Divider darkMode={darkMode} />

                <div
                    className="flex w-full justify-between px-48 my-0"
                    style={{ margin: -16 }}
                >
                    <SampleUpload
                        text={
                            'John, a 24 year old software engineer,loves fitness gadgets and the outdoors'
                        }
                        file={'person1'}
                    />
                    <SampleUpload
                        text={
                            'Tina, a 28-year-old marketer, is all about mindfulness'
                        }
                        file={'person2'}
                    />
                    <SampleUpload
                        text={
                            'Dani, a 20 year old Duke student, might just might be getting Alpaca a little too often'
                        }
                        file={'person3'}
                    />
                </div>
            </div>
        </div>
    );
}
