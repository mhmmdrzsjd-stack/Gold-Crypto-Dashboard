<template>
  <section class="chart-card">
    <!-- Header -->
    <div class="chart-header">
      <div class="chart-info">
        <span class="label">
          BITCOIN / USD
        </span>
        <div class="chart-price">
          $118,450.00
        </div>
        <div class="change">
          <span>▲</span>
          +3.42%
          <small>Today</small>
        </div>
      </div>
      <!-- Time Filter -->
      <div class="time-filter">
        <button>
          1H
        </button>
        <button class="active">
          1D
        </button>
        <button>
          1W
        </button>
        <button>
          1M
        </button>
        <button>
          1Y
        </button>
      </div>
    </div>
    <!-- Chart -->
    <div class="chart-container">
      <!-- Y Axis -->
      <div class="y-axis">
        <span>
          $120K
        </span>
        <span>
          $118K
        </span>
        <span>
          $116K
        </span>
        <span>
          $114K
        </span>
        <span>
          $112K
        </span>
      </div>
      <!-- Chart Area -->
      <div class="chart">
        <!-- Grid -->
        <div class="horizontal-line line-1"></div>
        <div class="horizontal-line line-2"></div>
        <div class="horizontal-line line-3"></div>
        <div class="horizontal-line line-4"></div>
        <div class="horizontal-line line-5"></div>
        <!-- SVG -->
        <svg
          viewBox="0 0 1000 350"
          preserveAspectRatio="none"
          class="chart-svg"
        >
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stop-color="#d9b85a"
                stop-opacity=".25"
              />
              <stop
                offset="100%"
                stop-color="#d9b85a"
                stop-opacity="0"
              />
            </linearGradient>
          </defs>
          <!-- Area -->
          <polygon
            points="
              0,275
              70,250
              130,260
              190,220
              250,235
              310,180
              370,195
              430,155
              490,175
              550,130
              610,145
              670,105
              730,125
              790,90
              850,110
              910,65
              1000,45
              1000,350
              0,350
            "
            fill="url(#chartGradient)"
          />
          <!-- Main Line -->
          <polyline
            points="
              0,275
              70,250
              130,260
              190,220
              250,235
              310,180
              370,195
              430,155
              490,175
              550,130
              610,145
              670,105
              730,125
              790,90
              850,110
              910,65
              1000,45
            "
            fill="none"
            stroke="#d9b85a"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <!-- Last Point -->
          <circle
            cx="1000"
            cy="45"
            r="7"
            fill="#d9b85a"
          />
          <circle
            cx="1000"
            cy="45"
            r="13"
            fill="#d9b85a"
            opacity=".15"
          />
        </svg>
        <!-- X Axis -->
        <div class="x-axis">
          <span>
            00:00
          </span>
          <span>
            04:00
          </span>
          <span>
            08:00
          </span>
          <span>
            12:00
          </span>
          <span>
            16:00
          </span>
          <span>
            20:00
          </span>
          <span>
            24:00
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
