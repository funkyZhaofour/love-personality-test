const QUESTIONS = [
  {
    "id": 1,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我希望恋人每天主动联系我"
  },
  {
    "id": 2,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我会在意对方回复消息的速度"
  },
  {
    "id": 3,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我希望经常见面"
  },
  {
    "id": 4,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我喜欢频繁聊天"
  },
  {
    "id": 5,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我需要情感上的回应"
  },
  {
    "id": 6,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我不太能接受长时间不联系"
  },
  {
    "id": 7,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我喜欢表达想念"
  },
  {
    "id": 8,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我希望对方表达爱意"
  },
  {
    "id": 9,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我需要陪伴感"
  },
  {
    "id": 10,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我希望关系更亲密"
  },
  {
    "id": 11,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我会主动分享生活"
  },
  {
    "id": 12,
    "dimension": "intimacy",
    "dimensionName": "亲密需求",
    "text": "我希望恋人参与我的日常"
  },
  {
    "id": 13,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我会担心对方不够在乎我"
  },
  {
    "id": 14,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "对方冷淡时我会多想"
  },
  {
    "id": 15,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我需要确认关系稳定"
  },
  {
    "id": 16,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我会反复思考对方态度"
  },
  {
    "id": 17,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我容易缺乏安全感"
  },
  {
    "id": 18,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我会担心被忽视"
  },
  {
    "id": 19,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我在意对方是否重视我"
  },
  {
    "id": 20,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我会观察对方细节变化"
  },
  {
    "id": 21,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我容易敏感"
  },
  {
    "id": 22,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我害怕关系变淡"
  },
  {
    "id": 23,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我需要确定感"
  },
  {
    "id": 24,
    "dimension": "security",
    "dimensionName": "依恋安全感",
    "text": "我在关系中容易焦虑"
  },
  {
    "id": 25,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我需要自己的空间"
  },
  {
    "id": 26,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我不喜欢被过度打扰"
  },
  {
    "id": 27,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我有自己的生活节奏"
  },
  {
    "id": 28,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我不会围绕恋人生活"
  },
  {
    "id": 29,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我可以独处"
  },
  {
    "id": 30,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我重视个人时间"
  },
  {
    "id": 31,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我不喜欢被控制"
  },
  {
    "id": 32,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我希望保持独立"
  },
  {
    "id": 33,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我有自己的朋友圈"
  },
  {
    "id": 34,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我不希望关系过度绑定"
  },
  {
    "id": 35,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我可以拒绝对方要求"
  },
  {
    "id": 36,
    "dimension": "boundary",
    "dimensionName": "独立边界",
    "text": "我重视自我边界"
  },
  {
    "id": 37,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我在冲突中能控制情绪"
  },
  {
    "id": 38,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我不会轻易爆发"
  },
  {
    "id": 39,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我遇事较冷静"
  },
  {
    "id": 40,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我能理性处理问题"
  },
  {
    "id": 41,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我不容易情绪失控"
  },
  {
    "id": 42,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我情绪波动不大"
  },
  {
    "id": 43,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我不会说伤人的话"
  },
  {
    "id": 44,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我能控制冲动"
  },
  {
    "id": 45,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我不会翻旧账"
  },
  {
    "id": 46,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我不喜欢情绪对抗"
  },
  {
    "id": 47,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我能自我调节情绪"
  },
  {
    "id": 48,
    "dimension": "emotion",
    "dimensionName": "情绪稳定",
    "text": "我情绪比较稳定"
  },
  {
    "id": 49,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我愿意主动沟通"
  },
  {
    "id": 50,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我可以表达真实想法"
  },
  {
    "id": 51,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我会倾听对方"
  },
  {
    "id": 52,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我愿意解决问题"
  },
  {
    "id": 53,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我不喜欢冷战"
  },
  {
    "id": 54,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我会主动修复关系"
  },
  {
    "id": 55,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我可以接受不同意见"
  },
  {
    "id": 56,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我会解释自己行为"
  },
  {
    "id": 57,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我不回避冲突"
  },
  {
    "id": 58,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我能说出需求"
  },
  {
    "id": 59,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我愿意理解对方"
  },
  {
    "id": 60,
    "dimension": "communication",
    "dimensionName": "沟通能力",
    "text": "我沟通比较直接"
  },
  {
    "id": 61,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我认真对待恋爱"
  },
  {
    "id": 62,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我倾向长期关系"
  },
  {
    "id": 63,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我会为关系付出"
  },
  {
    "id": 64,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我有责任感"
  },
  {
    "id": 65,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我做事会考虑对方"
  },
  {
    "id": 66,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我不会轻易开始关系"
  },
  {
    "id": 67,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我不喜欢不稳定关系"
  },
  {
    "id": 68,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我重视承诺"
  },
  {
    "id": 69,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我会坚持关系"
  },
  {
    "id": 70,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我愿意承担责任"
  },
  {
    "id": 71,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我不随便放弃"
  },
  {
    "id": 72,
    "dimension": "commitment",
    "dimensionName": "责任承诺",
    "text": "我会规划未来"
  },
  {
    "id": 73,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我能理解对方情绪"
  },
  {
    "id": 74,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我会关心对方"
  },
  {
    "id": 75,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我愿意为对方付出"
  },
  {
    "id": 76,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我会站在对方角度思考"
  },
  {
    "id": 77,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我在意对方感受"
  },
  {
    "id": 78,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我会安慰别人"
  },
  {
    "id": 79,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我对他人有耐心"
  },
  {
    "id": 80,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我能感知情绪变化"
  },
  {
    "id": 81,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我会照顾别人"
  },
  {
    "id": 82,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我比较体贴"
  },
  {
    "id": 83,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我容易共情"
  },
  {
    "id": 84,
    "dimension": "empathy",
    "dimensionName": "共情能力",
    "text": "我会为别人考虑"
  },
  {
    "id": 85,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我会考虑未来生活"
  },
  {
    "id": 86,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我有规划意识"
  },
  {
    "id": 87,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我重视经济基础"
  },
  {
    "id": 88,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我会理性消费"
  },
  {
    "id": 89,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我考虑长期发展"
  },
  {
    "id": 90,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我希望稳定生活"
  },
  {
    "id": 91,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我有目标感"
  },
  {
    "id": 92,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我不喜欢不确定性"
  },
  {
    "id": 93,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我愿意为未来努力"
  },
  {
    "id": 94,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我会规划人生"
  },
  {
    "id": 95,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我考虑现实因素"
  },
  {
    "id": 96,
    "dimension": "reality",
    "dimensionName": "现实规划",
    "text": "我希望关系可持续"
  }
];
