"use client";

import { useState } from "react";
import { Upload, Check, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CustomOrderForm() {
  const [file, setFile] = useState<File | null>(null);
  const [units, setUnits] = useState("mm");
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [printerQuality, setPrinterQuality] = useState("");
  const [material, setMaterial] = useState("");
  const [infill, setInfill] = useState(20);
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      //   setActiveTab("settings");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Custom 3D Print Order
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Model</TabsTrigger>
            <TabsTrigger value="settings" disabled={!file}>
              Print Settings
            </TabsTrigger>
            <TabsTrigger
              value="review"
              disabled={!file || !material || !printerQuality}
            >
              Review Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload 3D Model</CardTitle>
                <CardDescription>
                  Supported formats: STL, OBJ, STEP, IGS (max 50MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <Label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        STL, OBJ, STEP, IGS (MAX. 50MB)
                      </p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".stl,.obj,.step,.igs"
                    />
                  </Label>
                </div>
                {file && (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      File selected: {file.name}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Units</Label>
                        <RadioGroup
                          defaultValue="mm"
                          onValueChange={setUnits}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mm" id="mm" />
                            <Label htmlFor="mm">Millimeters (mm)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inch" id="inch" />
                            <Label htmlFor="inch">Inches</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label className="mb-2 block">Rotation</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>X Axis</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={rotation.x}
                                onChange={(e) =>
                                  setRotation({
                                    ...rotation,
                                    x: Number(e.target.value),
                                  })
                                }
                                className="w-20"
                              />
                              <span>°</span>
                            </div>
                          </div>
                          <div>
                            <Label>Y Axis</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={rotation.y}
                                onChange={(e) =>
                                  setRotation({
                                    ...rotation,
                                    y: Number(e.target.value),
                                  })
                                }
                                className="w-20"
                              />
                              <span>°</span>
                            </div>
                          </div>
                          <div>
                            <Label>Z Axis</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={rotation.z}
                                onChange={(e) =>
                                  setRotation({
                                    ...rotation,
                                    z: Number(e.target.value),
                                  })
                                }
                                className="w-20"
                              />
                              <span>°</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              {file && (
                <CardFooter>
                  <Button
                    onClick={() => setActiveTab("settings")}
                    className="ml-auto"
                  >
                    Continue to Print Settings
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Print Settings</CardTitle>
                <CardDescription>
                  Configure your print quality and material specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="quality">Print Quality</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Higher quality means finer detail but longer print
                            time
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={printerQuality}
                    onValueChange={setPrinterQuality}
                  >
                    <SelectTrigger id="quality">
                      <SelectValue placeholder="Select print quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        0.2mm Standard Quality
                      </SelectItem>
                      <SelectItem value="medium">
                        0.15mm Medium Quality
                      </SelectItem>
                      <SelectItem value="high">0.1mm High Quality</SelectItem>
                      <SelectItem value="ultra">
                        0.05mm Ultra High Quality
                      </SelectItem>
                      <SelectItem value="custom1">
                        0.15mm Standard + 0.25mm Nozzle
                      </SelectItem>
                      <SelectItem value="custom2">
                        0.2mm Standard + 0.6mm Nozzle
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="material">Material</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Different materials have different properties and
                            use cases
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pla">
                        PLA - Standard Strength
                      </SelectItem>
                      <SelectItem value="abs">ABS - High Strength</SelectItem>
                      <SelectItem value="petg">
                        PETG - Chemical Resistant
                      </SelectItem>
                      <SelectItem value="tpu">TPU - Flexible</SelectItem>
                      <SelectItem value="nylon">
                        Nylon - High Durability
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label>Infill Density</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Higher infill means stronger parts but more material
                            and time
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[infill]}
                      onValueChange={([value]) => setInfill(value)}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{infill}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions or requirements?"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("upload")}
                >
                  Back to Upload
                </Button>
                <Button
                  onClick={() => setActiveTab("review")}
                  disabled={!material || !printerQuality}
                >
                  Continue to Review
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Review your order details before submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Model Details</h3>
                    <p>
                      <strong>File:</strong> {file?.name}
                    </p>
                    <p>
                      <strong>Units:</strong> {units}
                    </p>
                    <p>
                      <strong>Rotation:</strong> X: {rotation.x}°, Y:{" "}
                      {rotation.y}°, Z: {rotation.z}°
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Print Settings</h3>
                    <p>
                      <strong>Quality:</strong> {printerQuality}
                    </p>
                    <p>
                      <strong>Material:</strong> {material}
                    </p>
                    <p>
                      <strong>Infill:</strong> {infill}%
                    </p>
                    <p>
                      <strong>Quantity:</strong> {quantity}
                    </p>
                  </div>
                </div>
                {notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Notes</h3>
                    <p>{notes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("settings")}
                >
                  Back to Settings
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>

      {submitStatus === "success" && (
        <Alert className="mt-4">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your order has been successfully submitted. We'll contact you soon
            with further details.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem submitting your order. Please try again later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
