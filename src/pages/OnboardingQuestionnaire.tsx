
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CheckCircle, AlertCircle, FileText, User, 
  Home, Phone, Heart, UserPlus, Shield, BookText,
  Plus, Minus, Pill, CalendarClock, Passport, UserCircle
} from "lucide-react";

interface QuestionOption {
  id: string;
  textEn: string;
  textEs: string;
  value: string;
}

interface SubQuestion {
  id: string;
  questionEn: string;
  questionEs: string;
  options?: QuestionOption[];
  type: "text" | "select" | "boolean" | "textarea" | "phone" | "email";
  required?: boolean;
}

interface Question {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  icon: React.ReactNode;
  subQuestions: SubQuestion[];
  allowMultiple?: boolean;
}

// Main sections/questions
const questions: Question[] = [
  {
    id: "personal",
    titleEn: "Personal Information",
    titleEs: "Información Personal",
    descriptionEn: "Basic personal details",
    descriptionEs: "Datos personales básicos",
    icon: <User className="h-5 w-5" />,
    subQuestions: [
      {
        id: "fullName",
        questionEn: "Full Name",
        questionEs: "Nombre Completo",
        type: "text",
        required: true,
      },
      {
        id: "dob",
        questionEn: "Date of Birth",
        questionEs: "Fecha de Nacimiento",
        type: "text",
        required: true,
      },
      {
        id: "nie",
        questionEn: "NIE Number (Spanish Foreigner ID)",
        questionEs: "Número NIE (Identificación de Extranjero)",
        type: "text",
        required: true,
      },
      {
        id: "passport",
        questionEn: "Passport Number",
        questionEs: "Número de Pasaporte",
        type: "text",
        required: true,
      },
      {
        id: "email",
        questionEn: "Email Address",
        questionEs: "Correo Electrónico",
        type: "email",
        required: true,
      },
    ],
  },
  {
    id: "address",
    titleEn: "Primary Address",
    titleEs: "Dirección Principal",
    descriptionEn: "Your home address information",
    descriptionEs: "Información de su domicilio",
    icon: <Home className="h-5 w-5" />,
    subQuestions: [
      {
        id: "street",
        questionEn: "Street Address",
        questionEs: "Dirección",
        type: "text",
        required: true,
      },
      {
        id: "city",
        questionEn: "City",
        questionEs: "Ciudad",
        type: "text",
        required: true,
      },
      {
        id: "province",
        questionEn: "Province",
        questionEs: "Provincia",
        type: "text",
        required: true,
      },
      {
        id: "postalCode",
        questionEn: "Postal Code",
        questionEs: "Código Postal",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: "postalAddress",
    titleEn: "Postal Address (if different)",
    titleEs: "Dirección Postal (si es diferente)",
    descriptionEn: "Your alternative mailing address",
    descriptionEs: "Su dirección postal alternativa",
    icon: <Home className="h-5 w-5" />,
    subQuestions: [
      {
        id: "sameAsHome",
        questionEn: "Same as Home Address?",
        questionEs: "¿Igual que la Dirección Principal?",
        type: "boolean",
        required: true,
      },
      {
        id: "postalStreet",
        questionEn: "Street Address",
        questionEs: "Dirección",
        type: "text",
      },
      {
        id: "postalCity",
        questionEn: "City",
        questionEs: "Ciudad",
        type: "text",
      },
      {
        id: "postalProvince",
        questionEn: "Province",
        questionEs: "Provincia",
        type: "text",
      },
      {
        id: "postalCode",
        questionEn: "Postal Code",
        questionEs: "Código Postal",
        type: "text",
      },
    ],
  },
  {
    id: "phoneNumbers",
    titleEn: "Phone Numbers",
    titleEs: "Números de Teléfono",
    descriptionEn: "Your contact phone numbers",
    descriptionEs: "Sus números de teléfono de contacto",
    icon: <Phone className="h-5 w-5" />,
    subQuestions: [
      {
        id: "mobilePhone",
        questionEn: "Mobile Phone",
        questionEs: "Teléfono Móvil",
        type: "phone",
        required: true,
      },
      {
        id: "homePhone",
        questionEn: "Home Phone",
        questionEs: "Teléfono Fijo",
        type: "phone",
      },
    ],
    allowMultiple: true,
  },
  {
    id: "emergencyContacts",
    titleEn: "Emergency Contacts",
    titleEs: "Contactos de Emergencia",
    descriptionEn: "People to contact in case of emergency",
    descriptionEs: "Personas a contactar en caso de emergencia",
    icon: <UserPlus className="h-5 w-5" />,
    subQuestions: [
      {
        id: "contactName",
        questionEn: "Contact Name",
        questionEs: "Nombre del Contacto",
        type: "text",
        required: true,
      },
      {
        id: "relationship",
        questionEn: "Relationship",
        questionEs: "Relación",
        type: "text",
        required: true,
      },
      {
        id: "contactPhone",
        questionEn: "Phone Number",
        questionEs: "Número de Teléfono",
        type: "phone",
        required: true,
      },
      {
        id: "alternatePhone",
        questionEn: "Alternate Phone",
        questionEs: "Teléfono Alternativo",
        type: "phone",
      },
      {
        id: "contactEmail",
        questionEn: "Email",
        questionEs: "Correo Electrónico",
        type: "email",
      },
    ],
    allowMultiple: true,
  },
  {
    id: "allergies",
    titleEn: "Allergies",
    titleEs: "Alergias",
    descriptionEn: "Information about your allergies",
    descriptionEs: "Información sobre sus alergias",
    icon: <AlertCircle className="h-5 w-5" />,
    subQuestions: [
      {
        id: "hasAllergies",
        questionEn: "Do you have any allergies?",
        questionEs: "¿Tiene alguna alergia?",
        type: "boolean",
        required: true,
      },
      {
        id: "allergyDetails",
        questionEn: "Please list your allergies and reactions",
        questionEs: "Por favor, liste sus alergias y reacciones",
        type: "textarea",
      },
    ],
  },
  {
    id: "medicalConditions",
    titleEn: "Medical Conditions",
    titleEs: "Condiciones Médicas",
    descriptionEn: "Information about your health conditions",
    descriptionEs: "Información sobre sus condiciones de salud",
    icon: <Heart className="h-5 w-5" />,
    subQuestions: [
      {
        id: "hasMedicalConditions",
        questionEn: "Do you have any medical conditions?",
        questionEs: "¿Tiene alguna condición médica?",
        type: "boolean",
        required: true,
      },
      {
        id: "conditionDetails",
        questionEn: "Please describe your medical conditions",
        questionEs: "Por favor, describa sus condiciones médicas",
        type: "textarea",
      },
    ],
  },
  {
    id: "medications",
    titleEn: "Current Medications",
    titleEs: "Medicamentos Actuales",
    descriptionEn: "Medications you are currently taking",
    descriptionEs: "Medicamentos que está tomando actualmente",
    icon: <Pill className="h-5 w-5" />,
    subQuestions: [
      {
        id: "medicationName",
        questionEn: "Medication Name",
        questionEs: "Nombre del Medicamento",
        type: "text",
        required: true,
      },
      {
        id: "dosage",
        questionEn: "Dosage",
        questionEs: "Dosis",
        type: "text",
        required: true,
      },
      {
        id: "frequency",
        questionEn: "Frequency",
        questionEs: "Frecuencia",
        type: "text",
        required: true,
      },
      {
        id: "purpose",
        questionEn: "Purpose",
        questionEs: "Propósito",
        type: "text",
      },
    ],
    allowMultiple: true,
  },
  {
    id: "doctorInformation",
    titleEn: "Doctor Information",
    titleEs: "Información del Médico",
    descriptionEn: "Your primary healthcare providers",
    descriptionEs: "Sus proveedores de atención médica primaria",
    icon: <UserCircle className="h-5 w-5" />,
    subQuestions: [
      {
        id: "doctorName",
        questionEn: "Doctor's Name",
        questionEs: "Nombre del Médico",
        type: "text",
        required: true,
      },
      {
        id: "doctorSpecialty",
        questionEn: "Specialty",
        questionEs: "Especialidad",
        type: "text",
      },
      {
        id: "doctorPhone",
        questionEn: "Doctor's Phone",
        questionEs: "Teléfono del Médico",
        type: "phone",
        required: true,
      },
      {
        id: "doctorAddress",
        questionEn: "Doctor's Address/Clinic Name",
        questionEs: "Dirección del Médico/Nombre de la Clínica",
        type: "text",
      },
    ],
    allowMultiple: true,
  },
  {
    id: "additionalInfo",
    titleEn: "Additional Information",
    titleEs: "Información Adicional",
    descriptionEn: "Any other information you'd like to provide",
    descriptionEs: "Cualquier otra información que desee proporcionar",
    icon: <FileText className="h-5 w-5" />,
    subQuestions: [
      {
        id: "preferredHospital",
        questionEn: "Preferred Hospital",
        questionEs: "Hospital Preferido",
        type: "text",
      },
      {
        id: "bloodType",
        questionEn: "Blood Type",
        questionEs: "Tipo de Sangre",
        type: "select",
        options: [
          { id: "aPositive", textEn: "A+", textEs: "A+", value: "A+" },
          { id: "aNegative", textEn: "A-", textEs: "A-", value: "A-" },
          { id: "bPositive", textEn: "B+", textEs: "B+", value: "B+" },
          { id: "bNegative", textEn: "B-", textEs: "B-", value: "B-" },
          { id: "abPositive", textEn: "AB+", textEs: "AB+", value: "AB+" },
          { id: "abNegative", textEn: "AB-", textEs: "AB-", value: "AB-" },
          { id: "oPositive", textEn: "O+", textEs: "O+", value: "O+" },
          { id: "oNegative", textEn: "O-", textEs: "O-", value: "O-" },
          { id: "unknown", textEn: "Unknown", textEs: "Desconocido", value: "unknown" },
        ],
      },
      {
        id: "additionalNotes",
        questionEn: "Additional Notes or Special Instructions",
        questionEs: "Notas Adicionales o Instrucciones Especiales",
        type: "textarea",
      },
    ],
  },
];

// Type for multi-entry sections
type MultiEntry = {
  [key: string]: string;
  _id: string; // Unique identifier for each entry
};

const OnboardingQuestionnaire: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // State for all answers
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  
  // State for multi-entry sections (emergency contacts, medications, etc.)
  const [multiEntries, setMultiEntries] = useState<{
    [sectionId: string]: MultiEntry[];
  }>({});
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Initialize multi-entries for sections that allow multiple entries
  useEffect(() => {
    const initialMultiEntries: { [sectionId: string]: MultiEntry[] } = {};
    
    questions.forEach(question => {
      if (question.allowMultiple) {
        initialMultiEntries[question.id] = [createEmptyEntry(question.id)];
      }
    });
    
    setMultiEntries(initialMultiEntries);
  }, []);
  
  // Create an empty entry with a unique ID for multi-entry sections
  const createEmptyEntry = (sectionId: string): MultiEntry => {
    const entry: MultiEntry = { _id: `${sectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
    
    questions.find(q => q.id === sectionId)?.subQuestions.forEach(subQ => {
      entry[subQ.id] = '';
    });
    
    return entry;
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex]);

  // Handle adding a new entry for multi-entry sections
  const handleAddEntry = (sectionId: string) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), createEmptyEntry(sectionId)]
    }));
  };

  // Handle removing an entry from multi-entry sections
  const handleRemoveEntry = (sectionId: string, entryId: string) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].filter(entry => entry._id !== entryId)
    }));
  };

  // Handle answer change for regular questions
  const handleAnswerChange = (
    questionId: string,
    subQuestionId: string,
    value: string | boolean
  ) => {
    setAnswers(prev => ({
      ...prev,
      [`${questionId}_${subQuestionId}`]: value
    }));
  };

  // Handle answer change for multi-entry questions
  const handleMultiEntryChange = (
    sectionId: string,
    entryId: string,
    subQuestionId: string,
    value: string
  ) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map(entry => 
        entry._id === entryId ? { ...entry, [subQuestionId]: value } : entry
      )
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // Process and save answers
    const formattedAnswers = {
      ...answers,
      multiEntries: multiEntries
    };
    
    console.log("Answers:", formattedAnswers);
    
    toast.success(
      language === "en"
        ? "Questionnaire submitted successfully!"
        : "¡Cuestionario enviado con éxito!"
    );
    
    navigate("/dashboard");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Redirecting to login...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                {currentQuestion.icon}
                <CardTitle>
                  {language === "en"
                    ? currentQuestion.titleEn
                    : currentQuestion.titleEs}
                </CardTitle>
              </div>
              <CardDescription>
                {language === "en"
                  ? currentQuestion.descriptionEn
                  : currentQuestion.descriptionEs}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {language === "en"
                      ? `Step ${currentQuestionIndex + 1} of ${questions.length}`
                      : `Paso ${currentQuestionIndex + 1} de ${questions.length}`}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Render regular questions or multi-entry section */}
              {currentQuestion.allowMultiple ? (
                <div className="space-y-8">
                  {/* Render multiple entries */}
                  {multiEntries[currentQuestion.id]?.map((entry, entryIndex) => (
                    <div
                      key={entry._id}
                      className="border rounded-lg p-4 relative space-y-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">
                          {language === "en"
                            ? `${currentQuestion.titleEn} ${entryIndex + 1}`
                            : `${currentQuestion.titleEs} ${entryIndex + 1}`}
                        </h3>
                        {multiEntries[currentQuestion.id].length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveEntry(currentQuestion.id, entry._id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Remove entry"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {/* Render sub-questions for this entry */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.subQuestions.map((subQuestion) => (
                          <div key={subQuestion.id} className="space-y-2">
                            <Label htmlFor={`${entry._id}_${subQuestion.id}`}>
                              {language === "en"
                                ? subQuestion.questionEn
                                : subQuestion.questionEs}
                              {subQuestion.required && " *"}
                            </Label>

                            {subQuestion.type === "text" && (
                              <Input
                                id={`${entry._id}_${subQuestion.id}`}
                                type="text"
                                value={entry[subQuestion.id] || ""}
                                onChange={(e) =>
                                  handleMultiEntryChange(
                                    currentQuestion.id,
                                    entry._id,
                                    subQuestion.id,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  language === "en"
                                    ? `Enter ${subQuestion.questionEn.toLowerCase()}`
                                    : `Ingrese ${subQuestion.questionEs.toLowerCase()}`
                                }
                              />
                            )}

                            {subQuestion.type === "email" && (
                              <Input
                                id={`${entry._id}_${subQuestion.id}`}
                                type="email"
                                value={entry[subQuestion.id] || ""}
                                onChange={(e) =>
                                  handleMultiEntryChange(
                                    currentQuestion.id,
                                    entry._id,
                                    subQuestion.id,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  language === "en" ? "Enter email" : "Ingrese correo"
                                }
                              />
                            )}

                            {subQuestion.type === "phone" && (
                              <Input
                                id={`${entry._id}_${subQuestion.id}`}
                                type="tel"
                                value={entry[subQuestion.id] || ""}
                                onChange={(e) =>
                                  handleMultiEntryChange(
                                    currentQuestion.id,
                                    entry._id,
                                    subQuestion.id,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  language === "en"
                                    ? "Enter phone number"
                                    : "Ingrese número de teléfono"
                                }
                              />
                            )}

                            {subQuestion.type === "textarea" && (
                              <Textarea
                                id={`${entry._id}_${subQuestion.id}`}
                                value={entry[subQuestion.id] || ""}
                                onChange={(e) =>
                                  handleMultiEntryChange(
                                    currentQuestion.id,
                                    entry._id,
                                    subQuestion.id,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  language === "en"
                                    ? "Enter details"
                                    : "Ingrese detalles"
                                }
                              />
                            )}

                            {subQuestion.type === "select" && subQuestion.options && (
                              <select
                                id={`${entry._id}_${subQuestion.id}`}
                                className="w-full p-2 border rounded"
                                value={entry[subQuestion.id] || ""}
                                onChange={(e) =>
                                  handleMultiEntryChange(
                                    currentQuestion.id,
                                    entry._id,
                                    subQuestion.id,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">
                                  {language === "en" ? "Select..." : "Seleccionar..."}
                                </option>
                                {subQuestion.options.map((option) => (
                                  <option key={option.id} value={option.value}>
                                    {language === "en"
                                      ? option.textEn
                                      : option.textEs}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Add button for multiple entries */}
                  <Button
                    variant="outline"
                    onClick={() => handleAddEntry(currentQuestion.id)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {language === "en"
                      ? `Add Another ${currentQuestion.titleEn}`
                      : `Agregar Otro ${currentQuestion.titleEs}`}
                  </Button>
                </div>
              ) : (
                // Regular questions (not multi-entry)
                <div className="space-y-6">
                  {currentQuestion.subQuestions.map((subQuestion) => {
                    // For postal address, only show additional fields if sameAsHome is false
                    if (
                      currentQuestion.id === "postalAddress" &&
                      subQuestion.id !== "sameAsHome" &&
                      answers[`postalAddress_sameAsHome`] === true
                    ) {
                      return null;
                    }

                    // For allergies & medical conditions, only show details if the condition is true
                    if (
                      (currentQuestion.id === "allergies" &&
                        subQuestion.id === "allergyDetails" &&
                        answers[`allergies_hasAllergies`] !== true) ||
                      (currentQuestion.id === "medicalConditions" &&
                        subQuestion.id === "conditionDetails" &&
                        answers[`medicalConditions_hasMedicalConditions`] !== true)
                    ) {
                      return null;
                    }

                    return (
                      <div key={subQuestion.id} className="space-y-2">
                        <Label htmlFor={`${currentQuestion.id}_${subQuestion.id}`}>
                          {language === "en"
                            ? subQuestion.questionEn
                            : subQuestion.questionEs}
                          {subQuestion.required && " *"}
                        </Label>

                        {subQuestion.type === "text" && (
                          <Input
                            id={`${currentQuestion.id}_${subQuestion.id}`}
                            type="text"
                            value={answers[`${currentQuestion.id}_${subQuestion.id}`] || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                currentQuestion.id,
                                subQuestion.id,
                                e.target.value
                              )
                            }
                            placeholder={
                              language === "en"
                                ? `Enter ${subQuestion.questionEn.toLowerCase()}`
                                : `Ingrese ${subQuestion.questionEs.toLowerCase()}`
                            }
                          />
                        )}

                        {subQuestion.type === "email" && (
                          <Input
                            id={`${currentQuestion.id}_${subQuestion.id}`}
                            type="email"
                            value={answers[`${currentQuestion.id}_${subQuestion.id}`] || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                currentQuestion.id,
                                subQuestion.id,
                                e.target.value
                              )
                            }
                            placeholder={
                              language === "en" ? "Enter email" : "Ingrese correo"
                            }
                          />
                        )}

                        {subQuestion.type === "phone" && (
                          <Input
                            id={`${currentQuestion.id}_${subQuestion.id}`}
                            type="tel"
                            value={answers[`${currentQuestion.id}_${subQuestion.id}`] || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                currentQuestion.id,
                                subQuestion.id,
                                e.target.value
                              )
                            }
                            placeholder={
                              language === "en"
                                ? "Enter phone number"
                                : "Ingrese número de teléfono"
                            }
                          />
                        )}

                        {subQuestion.type === "textarea" && (
                          <Textarea
                            id={`${currentQuestion.id}_${subQuestion.id}`}
                            value={answers[`${currentQuestion.id}_${subQuestion.id}`] || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                currentQuestion.id,
                                subQuestion.id,
                                e.target.value
                              )
                            }
                            placeholder={
                              language === "en" ? "Enter details" : "Ingrese detalles"
                            }
                          />
                        )}

                        {subQuestion.type === "boolean" && (
                          <div className="flex gap-4">
                            <Button
                              variant={
                                answers[`${currentQuestion.id}_${subQuestion.id}`] === true
                                  ? "secondary"
                                  : "outline"
                              }
                              onClick={() =>
                                handleAnswerChange(currentQuestion.id, subQuestion.id, true)
                              }
                            >
                              {language === "en" ? "Yes" : "Sí"}
                            </Button>
                            <Button
                              variant={
                                answers[`${currentQuestion.id}_${subQuestion.id}`] === false
                                  ? "secondary"
                                  : "outline"
                              }
                              onClick={() =>
                                handleAnswerChange(currentQuestion.id, subQuestion.id, false)
                              }
                            >
                              {language === "en" ? "No" : "No"}
                            </Button>
                          </div>
                        )}

                        {subQuestion.type === "select" && subQuestion.options && (
                          <select
                            id={`${currentQuestion.id}_${subQuestion.id}`}
                            className="w-full p-2 border rounded"
                            value={answers[`${currentQuestion.id}_${subQuestion.id}`] || ""}
                            onChange={(e) =>
                              handleAnswerChange(
                                currentQuestion.id,
                                subQuestion.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="">
                              {language === "en" ? "Select..." : "Seleccionar..."}
                            </option>
                            {subQuestion.options.map((option) => (
                              <option key={option.id} value={option.value}>
                                {language === "en" ? option.textEn : option.textEs}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                >
                  {language === "en" ? "Previous" : "Anterior"}
                </Button>
                
                {isLastQuestion ? (
                  <Button onClick={handleSubmit}>
                    {language === "en" ? "Submit" : "Enviar"}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {language === "en" ? "Next" : "Siguiente"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingQuestionnaire;
