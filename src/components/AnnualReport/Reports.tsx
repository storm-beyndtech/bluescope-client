"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  PieChart,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Reports() {
  // Financial data
  const financialData = {
    totalSales: {
      value: 161.5,
      change: 2.8,
      previous: 157.0,
      unit: "million",
      isPositive: true,
    },
    productSales: {
      value: 125.9,
      change: 9.6,
      previous: 114.8,
      unit: "million",
      isPositive: true,
    },
    serviceSales: {
      value: 35.6,
      change: 14.2,
      previous: 31.1,
      unit: "million",
      isPositive: true,
    },
    costOfSales: {
      value: 71.3,
      change: 6.9,
      previous: 66.8,
      unit: "million",
      isPositive: false,
    },
    sgaExpenses: {
      value: 15.1,
      change: 18.2,
      previous: 12.8,
      unit: "million",
      isPositive: false,
    },
    netIncome: {
      value: 87.4,
      unit: "million",
    },
    adjustedEbitda: {
      value: 58.3,
      unit: "million",
    },
    liquidity: {
      value: 442.7,
      unit: "million",
    },
    cashEquivalents: {
      value: 268.4,
      unit: "million",
    },
  }

  // Chart data (simplified for this example)
  const quarterlyData = [
    { quarter: "Q1 2023", sales: 145.2 },
    { quarter: "Q2 2023", sales: 152.8 },
    { quarter: "Q3 2023", sales: 157.0 },
    { quarter: "Q4 2023", sales: 159.3 },
    { quarter: "Q1 2024", sales: 155.6 },
    { quarter: "Q2 2024", sales: 157.0 },
    { quarter: "Q3 2024", sales: 161.5 },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  // Helper function to format numbers
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Bluescopepty's <span className="text-[#1e56ff]">Q3 2023</span> Performance{" "}
            <span className="text-[#1e56ff]">Overview</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg max-w-2xl">
            In the third quarter of 2024, Bluescopepty achieved a solid growth trajectory, with total sales increasing
            by $4.5 million, a 2.8% rise compared to the previous quarter, bringing the total to $161.5 million.
          </p>
        </motion.div>
      </section>

      {/* Key Metrics */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" variants={itemVariants}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${formatNumber(financialData.totalSales.value)}M
                </h3>
              </div>
              <div
                className={`flex items-center ${
                  financialData.totalSales.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {financialData.totalSales.isPositive ? (
                  <ArrowUp className="h-5 w-5" />
                ) : (
                  <ArrowDown className="h-5 w-5" />
                )}
                <span className="ml-1 font-medium">{financialData.totalSales.change}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Compared to ${formatNumber(financialData.totalSales.previous)}M in Q2 2024
            </p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" variants={itemVariants}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Product Sales</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${formatNumber(financialData.productSales.value)}M
                </h3>
              </div>
              <div
                className={`flex items-center ${
                  financialData.productSales.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {financialData.productSales.isPositive ? (
                  <ArrowUp className="h-5 w-5" />
                ) : (
                  <ArrowDown className="h-5 w-5" />
                )}
                <span className="ml-1 font-medium">{financialData.productSales.change}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Compared to ${formatNumber(financialData.productSales.previous)}M in Q2 2024
            </p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" variants={itemVariants}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Service Sales</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${formatNumber(financialData.serviceSales.value)}M
                </h3>
              </div>
              <div
                className={`flex items-center ${
                  financialData.serviceSales.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {financialData.serviceSales.isPositive ? (
                  <ArrowUp className="h-5 w-5" />
                ) : (
                  <ArrowDown className="h-5 w-5" />
                )}
                <span className="ml-1 font-medium">{financialData.serviceSales.change}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Compared to ${formatNumber(financialData.serviceSales.previous)}M in Q2 2024
            </p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" variants={itemVariants}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Net Income</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${formatNumber(financialData.netIncome.value)}M
                </h3>
              </div>
              <div className="text-[#1e56ff]">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm text-gray-600">Strong performance across all business segments</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="bg-black text-white p-8 flex flex-col justify-between min-h-[240px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              <BarChart3 className="h-6 w-6 mb-4" />
              <h3 className="text-xl font-medium mb-2">Explore Business to Achieve More</h3>
            </div>
            <Link to="/explore" className="flex items-center text-sm mt-4">
              Explore Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="bg-black text-white p-8 flex flex-col justify-between min-h-[240px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <DollarSign className="h-6 w-6 mb-4" />
              <h3 className="text-xl font-medium mb-2">Ready to Make an Impact? Let's Create Something Amazing!</h3>
            </div>
            <Link to="/get-started" className="flex items-center text-sm mt-4">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="bg-black text-white p-8 flex flex-col justify-between min-h-[240px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="mb-4">"</div>
              <p className="text-sm">Their expertise helped us achieve real growth. Highly recommended!</p>
            </div>
            <div className="mt-4 text-sm">
              <p>Echo Agency</p>
              <p>Alexander Ronald</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Overview */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2">
        <motion.div
          className="bg-black p-8 flex items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1583009640887-eafd1a994d30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Office building"
            className="object-cover grayscale w-full h-full max-w-md"
          />
        </motion.div>
        <motion.div
          className="bg-[#1e56ff] text-white p-12 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-sm uppercase mb-4">Reports</h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Q3 2023 Performance Highlights and Market Analysis
          </h2>
          <p className="mb-4">
            Product sales experienced a robust surge, rising by $11.1 million, reflecting a 9.6% increase over Q2 2024,
            reaching $125.9 million. This performance was primarily driven by favorable market conditions and higher
            sales prices across our portfolio, particularly in oil, agriculture, and real estate tokenization
            investments.
          </p>
          <p className="mb-8">
            Despite maintaining a positive outlook, the company experienced a slight price regression during this
            period, primarily due to the expiration of higher-priced short-term contracts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                ${formatNumber(financialData.adjustedEbitda.value)}M
              </h3>
              <p className="text-xs sm:text-sm mt-1">Adjusted EBITDA</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                ${formatNumber(financialData.liquidity.value)}M
              </h3>
              <p className="text-xs sm:text-sm mt-1">Total Liquidity</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                ${formatNumber(financialData.cashEquivalents.value)}M
              </h3>
              <p className="text-xs sm:text-sm mt-1">Cash & Equivalents</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quarterly Performance Chart */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-sm mb-16 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quarterly Sales Performance</h3>
          <div className="h-64 relative">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48">
              {quarterlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center w-1/7">
                  <motion.div
                    className="bg-[#1e56ff] w-6 sm:w-8 md:w-12 rounded-t-md"
                    style={{
                      height: `${(data.sales / 170) * 100}%`,
                    }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(data.sales / 170) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-2">{data.quarter}</p>
                  <p className="text-[10px] sm:text-xs font-medium">${data.sales}M</p>
                </div>
              ))}
            </div>
            {/* Horizontal grid lines */}
            <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((_, index) => (
                <div key={index} className="border-t border-gray-200 w-full h-0"></div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Detailed Analysis */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Detailed Financial Analysis</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-[#1e56ff]" />
                </div>
                <h3 className="text-lg font-medium">Sales Growth</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Service sales saw a significant uplift, increasing by $4.5 million, or 14.2%, compared to Q2 2024. This
                growth was fueled by a rise in active projects across our portfolio, bolstered by the allocation of
                additional resources and continued customer demand for our diversified investment offerings.
              </p>
              <p className="text-gray-700">
                However, this strong growth was partially offset by a slight contraction in contract durations, as
                client activity concentrated around key asset locations during the quarter.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <PieChart className="h-5 w-5 text-[#1e56ff]" />
                </div>
                <h3 className="text-lg font-medium">Cost Analysis</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The cost of sales for Q3 2024 (excluding depreciation, depletion, and accretion expenses) increased by
                $4.5 million, or 6.9%, compared to the prior quarter, totaling $71.3 million. This was primarily driven
                by higher logistics and operational costs as we expanded our asset management capabilities.
              </p>
              <p className="text-gray-700">
                Selling, general, and administrative expenses (SG&A) for Q3 2024 increased by $2.3 million, or 18.2%,
                from the previous quarter, amounting to $15.1 million. The rise in SG&A was mainly attributed to $3.5
                million in non-recurring transaction costs associated with the ongoing optimization of our portfolio.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-[#1e56ff]" />
                </div>
                <h3 className="text-lg font-medium">Conclusion</h3>
              </div>
              <p className="text-gray-700 mb-4">
                In conclusion, Bluescopepty delivered a strong financial performance in Q3 2024, achieving a net income
                of $87.4 million and an Adjusted EBITDA of $58.3 million.
              </p>
              <p className="text-gray-700">
                As of August 20, 2024, the company's liquidity remained robust at $442.7 million, comprising $268.4
                million in cash and equivalents. This solid financial position underscores our commitment to long-term
                investment growth and capital appreciation for our stakeholders.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Financial Reports Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">All Financial Reports that Have Consulted</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <BarChart3 className="h-4 w-4 text-[#1e56ff]" />
                </div>
                <h3 className="text-sm font-medium">Client Data Report</h3>
              </div>
              <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Chart"
                  className="object-contain"
                />
              </div>
              <div className="text-xs text-gray-500">Data from 2023-2025</div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1583009640887-eafd1a994d30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
              alt="Office building"
              className="object-cover h-48 w-full"
            />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-medium">Visionary Hive</h3>
            </div>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="p-6">
              <div className="text-xs text-gray-500 mb-4">Join from 23 February 2025</div>
              <h3 className="text-2xl font-bold mb-1">McCann</h3>
              <h4 className="text-xl font-medium mb-6">Worldgroup</h4>
              <p className="text-sm text-gray-600">
                We provide strategic and innovative business management to enhance efficiency, branding, and growth.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#1e56ff] flex items-center justify-center">
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            to="/financial-reports"
            className="inline-flex items-center bg-[#1e56ff] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
          >
            View Full Financial Report <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
