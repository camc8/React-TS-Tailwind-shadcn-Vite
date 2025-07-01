import { useState } from "react";
import "./index.css";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { vibes, howBrokeMessages, blameOptions, bankingOptions } from "@/utils";
import { useExcuse } from "@/hooks/useExcuse";
import { CopyButton } from "./components/CopyButton";

type Options = {
  vibe?: string;
  timeframe?: string;
  howBroke?: number;
  blame?: string;
  banking?: string;
};

function App() {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Options>({});

  const { excuse, loading, error, generateExcuse } = useExcuse();

  const prev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setStep(1);
    }
  };

  const next = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setStep(5);
    }
  };

  return (
    <>
      <div className="fixed top-4 inset-x-0 flex justify-center">
        <div>
          <img src="/assets/fundspending.png" className="h-16" alt="FundsPending" />
          <p className="text-center">...i got u by next week</p>
        </div>
      </div>

      <div className="h-screen w-screen grid place-content-center text-center space-y-3">
        <div className="p-20 space-y-2">
          {step === 1 && (
            <div className="space-y-4 space-x-4">
              <h2 className="text-3xl font-light">Choose your vibe</h2>
              {vibes.map((vibe) => (
                <Button
                  key={vibe.value}
                  className="text-lg"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setSelectedOptions({ ...selectedOptions, vibe: vibe.value });
                    next();
                  }}
                >
                  {vibe.label}
                </Button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12">
              <h2 className="text-3xl font-light">How broke are you?</h2>
              <div className="border rounded-xl w-fit mx-auto p-3">
                <p className="text-2xl">{howBrokeMessages[selectedOptions.howBroke || 6]}</p>
              </div>
              <div className="flex justify-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">Jeff Bezos</span>
                  <Slider
                    defaultValue={[6]}
                    max={10}
                    min={1}
                    step={1}
                    className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    onValueChange={(value) =>
                      setSelectedOptions({ ...selectedOptions, howBroke: value[0] })
                    }
                  />
                  <span className="text-xl">Negative net worth</span>
                </div>
              </div>
              <div className="space-x-4">
                <Button className="text-lg" size="lg" onClick={prev}>Go back</Button>
                <Button className="text-lg" size="lg" onClick={next}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 space-x-4 grid place-items-center">
              <h2 className="text-3xl font-light">Who’s really at fault here?</h2>
              <div className="flex flex-wrap gap-4 md:w-1/2 justify-center">
                {blameOptions.map((blame) => (
                  <Button
                    key={blame.value}
                    className="text-lg"
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setSelectedOptions({ ...selectedOptions, blame: blame.value });
                      next();
                    }}
                  >
                    {blame.label}
                  </Button>
                ))}
              </div>
              <div>
                <Button className="text-lg mt-4" onClick={prev}>Go back</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 space-x-4 grid place-items-center">
              <h2 className="text-3xl font-light">What were you *banking* on?</h2>
              <div className="flex flex-wrap gap-4 md:w-1/2 justify-center">
                {bankingOptions.map((opt) => (
                  <Button
                    key={opt.value}
                    className="text-lg"
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      const newOptions = { ...selectedOptions, banking: opt.value };
                      setSelectedOptions(newOptions);
                      generateExcuse(newOptions);
                      next();
                    }}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              <div>
                <Button className="text-lg mt-4" onClick={prev}>Go back</Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-light">Here’s your excuse</h2>
              {loading && <p className="italic">Generating your excuse…</p>}
              {excuse && (
                <div className="space-y-3">
                  <p className="text-xl w-1/3 mx-auto rounded-xl p-4 border shadow-lg">{excuse}</p>
                </div>
              )}
              {error && <p className="text-red-500">{error}</p>}
              <div className="space-x-4">
                <Button className="text-lg" variant={"outline"} onClick={prev}>Go back</Button>
                {excuse && <CopyButton text={excuse} />}
                <Button className="text-lg" variant={"outline"} onClick={() => generateExcuse(selectedOptions)}>Try Again</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;