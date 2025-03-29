"use client"

import { ErrorBoundary } from "./error-boundary"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, Eye } from "lucide-react"
import { OnlineCVViewer } from "./online-cv-viewer"

export function BottomBar() {
  const [isCVDialogOpen, setIsCVDialogOpen] = useState(false)
  const [cvTab, setCvTab] = useState("download")

  return (
    <ErrorBoundary>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <motion.button
          className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-2 text-sm transition-transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCVDialogOpen(true)}
        >
          Get Full CV
        </motion.button>

        <Link href="/hire-me">
          <motion.button
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-2 text-sm border border-gray-700 transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.button>
        </Link>

        <div className="text-xs text-center text-gray-500">© 2025 Salman Khan</div>

        <Dialog open={isCVDialogOpen} onOpenChange={setIsCVDialogOpen}>
          <DialogContent className="bg-gray-800/95 backdrop-blur-md border-gray-700 max-w-5xl p-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            <div className="relative z-10 p-6">
              <DialogHeader className="mb-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Salman Khan's Resume
                  </DialogTitle>
                  <p className="text-gray-400 text-center mt-2">View or download my professional resume</p>
                </motion.div>
              </DialogHeader>

              <Tabs defaultValue="download" className="mt-4" onValueChange={setCvTab} value={cvTab}>
                <TabsList className="grid grid-cols-2 bg-gray-900/50 p-1 max-w-md mx-auto">
                  <TabsTrigger
                    value="download"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-md"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </TabsTrigger>
                  <TabsTrigger
                    value="view"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-md"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Online
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 relative">
                  <AnimatePresence mode="wait">
                    {cvTab === "download" && (
                      <motion.div
                        key="download"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        <motion.div
                          className="bg-gray-900/50 rounded-lg p-8 border border-gray-700 max-w-md w-full text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="mx-auto mb-6 bg-purple-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center"
                          >
                            <FileText className="h-10 w-10 text-purple-400" />
                          </motion.div>

                          <h3 className="text-xl font-bold text-white mb-2">Download Resume</h3>
                          <p className="text-gray-400 mb-6">
                            Get a copy of my resume to review offline or share with your team.
                          </p>

                          <div className="space-y-4">
                            <a href="/salman-khan-cv.pdf" download>
                              <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group"
                                size="lg"
                              >
                                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                Download PDF Version
                              </Button>
                            </a>

                            <a href="/salman-khan-cv.docx" download>
                              <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 group"
                                size="lg"
                                variant="outline"
                              >
                                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                Download Word Version
                              </Button>
                            </a>
                          </div>
                        </motion.div>

                        <motion.p
                          className="text-sm text-gray-400 text-center mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          You can also view my complete profile on LinkedIn
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                          className="mt-2"
                        >
                          <a href="https://www.linkedin.com/in/s4lmankhan/" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-[#0077b5] hover:bg-[#006399] group" size="sm">
                              <ExternalLink className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              View LinkedIn Profile
                            </Button>
                          </a>
                        </motion.div>
                      </motion.div>
                    )}

                    {cvTab === "view" && (
                      <motion.div
                        key="view"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
                      >
                        <OnlineCVViewer />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  )
}

